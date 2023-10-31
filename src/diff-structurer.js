import _ from 'lodash';

const makeDiffStructure = (objectBefore, objectAfter) => {
  const combinedObject = { ...objectBefore, ...objectAfter };
  const keys = _.orderBy(Object.keys(combinedObject));
  const diffStructure = [];
  keys.forEach((key) => {
    if (!Object.hasOwn(objectBefore, key)) {
      diffStructure.push({
        key, value: objectAfter[key], status: 'added',
      });
    } else if (!Object.hasOwn(objectAfter, key)) {
      diffStructure.push({
        key, value: objectBefore[key], status: 'deleted',
      });
    } else if (objectBefore[key] === objectAfter[key]) {
      diffStructure.push({
        key, value: objectBefore[key], status: 'unmodified',
      });
    } else if (_.isObject(objectBefore[key]) && objectBefore[key] !== null
        && _.isObject(objectAfter[key]) && objectAfter[key] !== null) {
      diffStructure.push({ key, status: 'nested', children: makeDiffStructure(objectBefore[key], objectAfter[key]) });
    } else {
      diffStructure.push({
        key, previousValue: objectBefore[key], value: objectAfter[key], status: 'modified',
      });
    }
  });
  return diffStructure;
};

export default makeDiffStructure;
