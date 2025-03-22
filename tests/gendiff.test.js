import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const expectedResultFlat = readFileSync(getFixturePath('expectedFile.txt'), 'utf8');
const expectedResultNestedStylish = readFileSync(getFixturePath('expectedFileNestedStylishFormat.txt'), 'utf8');
const expectedResultNestedPlainFormat = readFileSync(getFixturePath('expectedFileNestedPlainFormat.txt'), 'utf8');
const expectedResultJsonFormat = readFileSync(getFixturePath('expectedFileJsonStyle.text'), 'utf8');

const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');

const file1JsonNested1 = getFixturePath('file1NestedJson.json');
const file1JsonNested2 = getFixturePath('file2NestedJson.json');

const file1YamlNested1 = getFixturePath('file1NestedYaml.yaml');
const file1YamlNested2 = getFixturePath('file2NestedYaml.yaml');

const formatNameStylish = { format: 'stylish' };
const formatNamePlain = { format: 'plain' };
const formatNameJson = { format: 'json' };

test('genDiff flat files test yml', () => {
  expect(genDiff(file1Yml, file2Yml, formatNameStylish)).toBe(expectedResultFlat);
});

test('genDiff nested files test json', () => {
  expect(genDiff(file1JsonNested1, file1JsonNested2, formatNameStylish))
    .toBe(expectedResultNestedStylish);
});

test('genDiff nested stylish files test yaml', () => {
  expect(genDiff(file1YamlNested1, file1YamlNested2, formatNameStylish))
    .toBe(expectedResultNestedStylish);
});

test('genDiff nested plain files test yaml', () => {
  expect(genDiff(file1JsonNested1, file1YamlNested2, formatNamePlain))
    .toBe(expectedResultNestedPlainFormat);
});

test('genDiff flat files json formatter test', () => {
  expect(genDiff(file1Json, file2Json, formatNameJson)).toBe(expectedResultJsonFormat);
});
