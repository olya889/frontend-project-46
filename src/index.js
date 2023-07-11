import fs from 'fs';
import { cwd } from 'node:process';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';
import stylish from './formatters/stylish.js';

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

const genDiff = (path1, path2, formater = stylish) => {
  const contentOfFile1 = getContentAsObject(path1);
  const contentOfFile2 = getContentAsObject(path2);
  return formater(makeDiffStructure(contentOfFile1, contentOfFile2));
};

export default genDiff;
