import _ from 'lodash';

const formatValuePlain = (value) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (tree, path = '') => {
  const result = tree
    .flatMap((node) => {
      const propertyPath = path ? `${path}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${formatValuePlain(node.value)}`;
        case 'deleted':
          return `Property '${propertyPath}' was removed`;
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${formatValuePlain(node.value1)} to ${formatValuePlain(node.value2)}`;
        case 'nested':
          return formatPlain(node.children, propertyPath);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    })
    .filter(Boolean)
    .join('\n');
  return result;
};

export default formatPlain;
