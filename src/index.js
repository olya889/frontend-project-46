// import fs from 'fs';
import { cwd } from 'node:process';
import path from 'path';
import _ from 'lodash';
import getFileContentAsObject from './parse.js';

const getAbsolutePath = (givenPath) => path.resolve(cwd(), givenPath);

const compareProperties = (object1, object2, propertie) => {
  if (Object.hasOwn(object1, propertie) && Object.hasOwn(object2, propertie)) {
    if (object1[propertie] === object2[propertie]) {
      return `   ${propertie}: ${object1[propertie]}`;
    }
    return ` - ${propertie}: ${object1[propertie]}\n  + ${propertie}: ${object2[propertie]}`;
  }
  if (!Object.hasOwn(object1, propertie) && Object.hasOwn(object2, propertie)) {
    return ` + ${propertie}: ${object2[propertie]}`;
  }
  return ` - ${propertie}: ${object1[propertie]}`;
};

const genDiff = (path1, path2) => {
  const contentOfFile1 = getFileContentAsObject(getAbsolutePath(path1));
  const contentOfFile2 = getFileContentAsObject(getAbsolutePath(path2));
  const combinedObj = { ...contentOfFile1, ...contentOfFile2 };
  const keys = _.orderBy(Object.keys(combinedObj));
  const result = keys.reduce((acc, key) => `${acc}\n ${compareProperties(contentOfFile1, contentOfFile2, key)}`, '');
  return `{${result}\n}`;
};

export default genDiff;
