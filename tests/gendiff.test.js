import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const expectedResult = readFileSync(getFixturePath('expectedFile.txt'), 'utf8');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');

const file1Yaml = getFixturePath('file1.yaml');
const file2Yaml = getFixturePath('file2.yaml');

const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

const undefinedFormat1 = 'file1.jpeg';
const undefinedFormat2 = 'file2.jpeg';

test('genDiff flat files test json', () => {
  expect(genDiff(file1Json, file2Json)).toBe(expectedResult);
});

test('genDiff flat files test yaml', () => {
  expect(genDiff(file1Yaml, file2Yaml)).toBe(expectedResult);
});

test('genDiff flat files test yml', () => {
  expect(genDiff(file1Yml, file2Yml)).toBe(expectedResult);
});

test('genDiff undefined format', () => {
  expect(() => genDiff(undefinedFormat1, undefinedFormat2)).toThrow('Неизвестный формат.');
});
