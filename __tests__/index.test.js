import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

describe('path', () => {
  test('relative path', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectedResult);
    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expectedResult);
    expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(expectedResult);
  });
  test('absolute path', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectedResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expectedResult);
  });
});
