import fs from 'fs';
import path from 'path';

const getFileContentAsObject = (filePath) => {
  const extension = path.extname(filePath.toString()).toLowerCase();
  if (extension === '.json') {
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });
    return JSON.parse(content);
  }
  return '';
};

export default getFileContentAsObject;
