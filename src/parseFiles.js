import { readFileSync } from 'fs';

const parse = (filepath1, filepath2) => {
  const file1 = readFileSync(filepath1, { encoding: 'utf8', flag: 'r' });
  const file2 = readFileSync(filepath2, { encoding: 'utf8', flag: 'r' });
  console.log(file1);
  console.log(file2);
};

export default parse;
