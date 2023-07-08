import fs from 'fs';
import { cwd } from 'node:process';
import path from 'path';
import _ from 'lodash';
import parse from './parse.js';

const getAbsolutePath = (givenPath) => path.resolve(cwd(), givenPath);
const getExtension = (filePath) => path.extname(filePath.toString()).toLowerCase();
const getContent = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });

const getContentAsObject = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const extension = getExtension(absolutePath);
  const content = getContent(absolutePath);
  return parse(content, extension);
};

const makeDiffStructure = (objectBefore, objectAfter) => {
  const combinedObject = { ...objectBefore, ...objectAfter };
  const keys = _.orderBy(Object.keys(combinedObject));
  const diffStructure = keys.map((key) => {
    if (!Object.hasOwn(objectBefore, key)) {
      return {
        key, value: objectAfter[key], status: 'added', children: [],
      };
    }
    if (!Object.hasOwn(objectAfter, key)) {
      return {
        key, value: objectBefore[key], status: 'deleted', children: [],
      };
    }
    if (objectBefore[key] === objectAfter[key]) {
      return {
        key, value: objectBefore[key], status: 'unmodified', children: [],
      };
    }
    if (typeof objectBefore[key] === 'object' && objectBefore[key] !== null && typeof objectAfter[key] === 'object' && objectAfter[key] !== null) {
      return { key, status: 'nested', children: makeDiffStructure(objectBefore[key], objectAfter[key]) };
    }
    return [{
      key, value: objectBefore[key], status: 'deleted', children: [],
    },
    {
      key, value: objectAfter[key], status: 'added', children: [],
    },
    ];
  });
  return diffStructure;
};

const stylish = (structureOfDiff) => {
  const makeDataAsString = (data, depth) => {
    if (typeof data === 'object' && data !== null) {
      const entries = Object.entries(data);
      const currentIndent = ' '.repeat(depth * 4);
      const bracketIndent = ' '.repeat((depth - 1) * 4);
      const stringifiedData = entries.map(([key, value]) => `${currentIndent}${key}:${makeDataAsString(value, depth + 1)}`, '');
      return [' {', ...stringifiedData, `${bracketIndent}}`].join('\n');
    }
    return ` ${(data)}`;
  };
  const iter = (diffStructure, currentDepth) => {
    const bracketInd = ' '.repeat(currentDepth * 4);
    const leftShift = ' '.repeat(currentDepth * 4 - 2);
    const formattedResult = diffStructure.reduce((acc, element) => {
      const {
        key, value, status, children,
      } = element;
      if (status === 'added') {
        return `${acc}\n${leftShift}+ ${key}:${makeDataAsString(value, currentDepth + 1)}`;
      }
      if (status === 'deleted') {
        return `${acc}\n${leftShift}- ${key}:${makeDataAsString(value, currentDepth + 1)}`;
      }
      if (status === 'unmodified') {
        return `${acc}\n${leftShift}  ${key}:${makeDataAsString(value, 1)}`;
      }
      if (status === 'nested') {
        return `${acc}\n${leftShift}  ${key}: {${iter(children, currentDepth + 1)}\n${bracketInd}}`;
      }
      return `${acc}${iter(element, currentDepth)}`;
    }, '');
    return `${formattedResult}`;
  };
  return `{${(iter(structureOfDiff, 1))}\n}`;
};

const genDiff = (path1, path2) => {
  const contentOfFile1 = getContentAsObject(path1);
  const contentOfFile2 = getContentAsObject(path2);
  return stylish(makeDiffStructure(contentOfFile1, contentOfFile2));
};

console.log(genDiff('__fixtures__/before.json', '__fixtures__/after.json'));

export default genDiff;
