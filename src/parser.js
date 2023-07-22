import yaml from 'js-yaml';

const parse = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(file);
  }
  throw new Error(`Invalid extension - ${extension}`);
};

export default parse;
