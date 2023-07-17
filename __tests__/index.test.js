import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

// import expectedResult from '../__fixtures__/expected_result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish path', () => {
  const expectedResult = fs.readFileSync(getFixturePath('stylish_expected_result.txt'), { encoding: 'utf8' });
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'))).toEqual(expectedResult);
});

test('plain format', () => {
  const expectedResult = fs.readFileSync(getFixturePath('plain_expected_result.txt'), { encoding: 'utf8' });
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'plain')).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'plain')).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'), 'plain')).toEqual(expectedResult);
});

test('json format', () => {
  const expectedResult = fs.readFileSync(getFixturePath('expected_result.json'), { encoding: 'utf8' });
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'json')).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'), 'json')).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'), 'json')).toEqual(expectedResult);
});
