import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const expectedResultFlat = readFileSync(getFixturePath('expectedFile.txt'), 'utf8');
const expectedResultNested = readFileSync(getFixturePath('expectedFileNested.txt'), 'utf8');

const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

const file1JsonNested1 = getFixturePath('file1NestedJson.json');
const file1JsonNested2 = getFixturePath('file2NestedJson.json');

const file1YamlNested1 = getFixturePath('file1NestedYaml.yaml');
const file1YamlNested2 = getFixturePath('file2NestedYaml.yaml');

const formatNameDefault = { format: 'stylish' };

test('genDiff flat files test yml', () => {
  expect(genDiff(file1Yml, file2Yml, formatNameDefault)).toBe(expectedResultFlat);
});

test('genDiff nested files test json', () => {
  expect(genDiff(file1JsonNested1, file1JsonNested2, formatNameDefault)).toBe(expectedResultNested);
});

test('genDiff nested files test yaml', () => {
  expect(genDiff(file1YamlNested1, file1YamlNested2, formatNameDefault)).toBe(expectedResultNested);
});
