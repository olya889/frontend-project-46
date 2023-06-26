import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResult = '{\n'
+ '  - follow: false\n'
+ '    host: hexlet.io\n'
+ '  - proxy: 123.234.53.22\n'
+ '  - timeout: 50\n'
+ '  + timeout: 20\n'
+ '  + verbose: true\n'
+ '}';

describe('path', () => {
  test('relative path', () => {
    expect(genDiff('__fixtures__/file1_flat.json', '__fixtures__/file2_flat.json')).toEqual(expectedResult);
    expect(genDiff('__fixtures__/file1_flat.yml', '__fixtures__/file2_flat.yml')).toEqual(expectedResult);
    expect(genDiff('__fixtures__/file1_flat.yaml', '__fixtures__/file2_flat.yaml')).toEqual(expectedResult);
  });
  test('absolute path', () => {
    expect(genDiff(getFixturePath('file1_flat.json'), getFixturePath('file2_flat.json'))).toEqual(expectedResult);
    expect(genDiff(getFixturePath('file1_flat.yml'), getFixturePath('file2_flat.yml'))).toEqual(expectedResult);
    expect(genDiff(getFixturePath('file1_flat.yaml'), getFixturePath('file2_flat.yaml'))).toEqual(expectedResult);
  });
});
