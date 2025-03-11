import { readFileSync } from 'fs';
import path from 'path';
import parser from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFileSync(path.resolve(filepath1), { encoding: 'utf8', flag: 'r' });
  const file2 = readFileSync(path.resolve(filepath2), { encoding: 'utf8', flag: 'r' });
  const parsedFile1 = parser(file1);
  const parsedFile2 = parser(file2);
  const sortedEntriesFile1 = [...Object.entries(parsedFile1)].sort();
  const sortedEntriesFile2 = [...Object.entries(parsedFile2)].sort();
  const diffLines = sortedEntriesFile1.map(([key1, value1]) => {
    const foundEntry = sortedEntriesFile2.find(([key2]) => key2 === key1);
    if (foundEntry) {
      const [key2, value2] = foundEntry;
      if (value1 === value2) {
        return `    ${key1}: ${value1}`;
      } return [`  - ${key1}: ${value1}`, `  + ${key2}: ${value2}`];
    }
    return `  - ${key1}: ${value1}`;
  });
  const addedKeys = sortedEntriesFile2
    .filter(([key2]) => (!sortedEntriesFile1.find(([key1]) => key1 === key2)))
    .map(([key2, value2]) => `  + ${key2}: ${value2}`);

  const formattedResult = `{${'\n'}${[...diffLines, ...addedKeys].flat().join('\n')}${'\n'}}`;
  console.log(formattedResult);
};

export default genDiff;
