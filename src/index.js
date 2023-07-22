import fs from 'fs';
import { cwd } from 'node:process';
import path from 'path';
import parse from './parser.js';
import stylish from './formatters/stylish.js';
import getFormatterName from './formatters/index.js';
import makeDiffStructure from './diff-structurer.js';

const getAbsolutePath = (givenPath) => path.resolve(cwd(), givenPath);
const getExtension = (filePath) => path.extname(filePath.toString()).toLowerCase();
const getContent = (filePath) => fs.readFileSync(filePath, { encoding: 'utf8' });

const getContentAsObject = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const extension = getExtension(absolutePath);
  const content = getContent(absolutePath);
  return parse(content, extension);
};

const genDiff = (path1, path2, formatName = 'stylish') => {
  const contentOfFile1 = getContentAsObject(path1);
  const contentOfFile2 = getContentAsObject(path2);
  const formatter = getFormatterName(formatName);
  console.log(`formatname: ${formatName}`);
  return formatter(makeDiffStructure(contentOfFile1, contentOfFile2));
};

export default genDiff;
