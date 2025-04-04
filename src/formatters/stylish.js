import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);

const formatValue = (value, depth) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    const indent = replacer.repeat(depth * spacesCount);
    const closingIndent = replacer.repeat((depth - 1) * spacesCount);

    const formattedEntries = Object.entries(value)
      .map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`);
    return `{\n${formattedEntries.join('\n')}\n${closingIndent}}`;
  }
  return value;
};

const formatStylish = (tree, depth) => {
  const indent = getIndent(depth);
  const formattedLines = tree.map((node) => {
    const formattedValue = formatValue(node.value, depth + 1);

    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formattedValue}`;
      case 'deleted':
        return `${indent}- ${node.key}: ${formattedValue}`;
      case 'changed':
        return `${indent}- ${node.key}: ${formatValue(node.value1, depth + 1)}\n${indent}+ ${node.key}: ${formatValue(node.value2, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formattedValue}`;
      case 'nested':
        return `${indent}  ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${indent}  }`;
      default:
        throw new Error(`Неизвестный тип: ${node.type}`);
    }
  });
  return formattedLines.join('\n');
};

export default formatStylish;
