import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import json from './json.js';

const format = (newTree, choosenFormat) => {
  switch (choosenFormat) {
    case 'stylish':
      return `{\n${formatStylish(newTree, 1)}\n}`;
    case 'plain':
      return `${formatPlain(newTree)}`;
    case 'json':
      return `{\n${json(newTree, 1)}\n}`;
    default:
      throw new Error(`Неизвестный формат: ${choosenFormat}`);
  }
};

export default format;
