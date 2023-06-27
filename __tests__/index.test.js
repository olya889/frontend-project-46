import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import expectedResult from '../__fixtures__/expected_result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('absolute path', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expectedResult);
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'))).toEqual(expectedResult);
});
