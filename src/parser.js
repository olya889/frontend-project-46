// import fs from 'fs';
// import path from 'path';
import yaml from 'js-yaml';

const parse = (content, extension) => {
  if (extension === '.json') {
    return JSON.parse(content);
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(content);
  }
  return '';
};

export default parse;
