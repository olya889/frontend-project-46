import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatterName = (formatName) => {
  if (formatName === 'plain') {
    return plain;
  }
  if (formatName === 'json') {
    return json;
  }
  if (formatName === 'stylish' || formatName === undefined) {
    return stylish;
  }
  throw new Error(`Invalid formatter - ${formatName}`);
};

export default getFormatterName;
