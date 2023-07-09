import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
// import expectedResult from '../__fixtures__/expected_result.js';

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = fs.readFileSync(getFixturePath('expected_result.txt'), { encoding: 'utf8' });

test('absolute path', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'))).toEqual(expectedResult);
}); */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('absolute path', () => {
  const expectedResult = readFile('expected_result.txt');
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'))).toEqual(expectedResult);
});
