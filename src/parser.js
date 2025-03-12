import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const parser = (file) => {
  const typeOfFile = path.extname(file);
  const resolvedFile = path.resolve(file);
  switch (typeOfFile) {
    case '.json': {
      const readedFile = fs.readFileSync(resolvedFile, { encoding: 'utf8', flag: 'r' });
      return JSON.parse(readedFile);
    }
    case '.yaml': {
      const yamlFile = yaml.load(fs.readFileSync(resolvedFile, 'utf8'));
      return yamlFile;
    }
    case '.yml': {
      const ymlFile = yaml.load(fs.readFileSync(resolvedFile, 'utf8'));
      return ymlFile;
    }
    default:
      throw new Error('Неизвестный формат.');
  }
};

export default parser;
