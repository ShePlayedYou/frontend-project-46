import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (newTree, choosenFormat) => {
  switch (choosenFormat) {
    case 'stylish':
      return `{\n${formatStylish(newTree, 1)}\n}`;
    case 'plain':
      return `${formatPlain(newTree)}`;
    default:
      throw new Error(`Неизвестный формат: ${choosenFormat}`);
  }
};

export default format;
