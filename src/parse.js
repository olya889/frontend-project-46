// import fs from 'fs';
// import path from 'path';
import yaml from 'js-yaml';

const parse = (content, extension) => {
//  const extension = path.extname(filePath.toString()).toLowerCase();
//  const content = fs.readFileSync(filePath, { encoding: 'utf8' });
  if (extension === '.json') {
    return JSON.parse(content);
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(content);
  }
  return '';
};

export default parse;
