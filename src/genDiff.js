import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName = { format: 'stylish' }) => {
  const resolvedFile1 = getFilePath(filepath1);
  const resolvedFile2 = getFilePath(filepath2);
  const parsedFile1 = parser(fs.readFileSync(resolvedFile1, 'utf-8'), getFileFormat(resolvedFile1));
  const parsedFile2 = parser(fs.readFileSync(resolvedFile2, 'utf-8'), getFileFormat(resolvedFile2));
  const newTree = buildTree(parsedFile1, parsedFile2);
  const choosenFormat = formatName.format;
  const formatted = format(newTree, choosenFormat);
  return formatted;
};

export default genDiff;
