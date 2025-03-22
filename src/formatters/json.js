import _ from 'lodash';

const replacer = ' ';
const spacesCount = 2;

const getIndent = (depth) => replacer.repeat(depth * spacesCount);

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const entries = Object.entries(value).map(
      ([key, val]) => `${getIndent(depth + 1)}"${key}": ${formatValue(val, depth + 1)}`,
    );
    return `{\n${entries.join(',\n')}\n${getIndent(depth)}}`;
  }
  return JSON.stringify(value);
};

const formatJson = (tree, depth = 1) => {
  const result = tree.map((node) => {
    const indent = getIndent(depth);
    const keyName = `${indent}"${node.key}": `;

    switch (node.type) {
      case 'added':
        return `${keyName}{\n${getIndent(depth + 1)}"type": "added",\n${getIndent(depth + 1)}"value": ${formatValue(node.value, depth + 1)}\n${indent}}`;
      case 'deleted':
        return `${keyName}{\n${getIndent(depth + 1)}"type": "deleted",\n${getIndent(depth + 1)}"value": ${formatValue(node.value, depth + 1)}\n${indent}}`;
      case 'unchanged':
        return `${keyName}{\n${getIndent(depth + 1)}"type": "unchanged",\n${getIndent(depth + 1)}"value": ${formatValue(node.value, depth + 1)}\n${indent}}`;
      case 'changed':
        return `${keyName}{\n${getIndent(depth + 1)}"type": "changed",\n${getIndent(depth + 1)}"oldValue": ${formatValue(node.value1, depth + 1)},\n${getIndent(depth + 1)}"newValue": ${formatValue(node.value2, depth + 1)}\n${indent}}`;
      case 'nested':
        return `${keyName}{\n${formatJson(node.children, depth + 1)}\n${indent}}`;
      default:
        throw new Error(`Неизвестный тип: ${node.type}`);
    }
  });

  return result.join(',\n');
};

export default formatJson;
