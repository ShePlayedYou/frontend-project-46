import yaml from 'js-yaml';

const parser = (file, format) => {
  switch (format) {
    case '.json': {
      return JSON.parse(file);
    }
    case '.yaml': {
      return yaml.load(file);
    }
    case '.yml': {
      return yaml.load(file);
    }
    default:
      throw new Error('Неизвестный формат.');
  }
};

export default parser;
