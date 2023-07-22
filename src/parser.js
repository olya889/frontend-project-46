import yaml from 'js-yaml';

const parse = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(file);
  }
  return '';
};

export default parse;
