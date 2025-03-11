import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const expectedResult = readFileSync(getFixturePath('expectedFile.txt'), 'utf8');

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

test('genDiff flat files test', () => {
  expect(genDiff(file1, file2)).toBe(expectedResult);
});
