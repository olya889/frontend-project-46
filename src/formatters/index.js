import stylish from './stylish.js';
import plain from './plain.js';

const getFormatterName = (formatName) => {
  if (formatName === 'plain') {
    return plain;
  }
  return stylish;
};

export default getFormatterName;
