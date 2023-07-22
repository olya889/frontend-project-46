import _ from 'lodash';

const makeDiffStructure = (objectBefore, objectAfter) => {
  const combinedObject = { ...objectBefore, ...objectAfter };
  const keys = _.orderBy(Object.keys(combinedObject));
  const diffStructure = keys.map((key) => {
    if (!Object.hasOwn(objectBefore, key)) {
      return {
        key, value: objectAfter[key], status: 'added', children: [],
      };
    }
    if (!Object.hasOwn(objectAfter, key)) {
      return {
        key, value: objectBefore[key], status: 'deleted', children: [],
      };
    }
    if (objectBefore[key] === objectAfter[key]) {
      return {
        key, value: objectBefore[key], status: 'unmodified', children: [],
      };
    }
    if (_.isObject(objectBefore[key]) && objectBefore[key] !== null
        && _.isObject(objectAfter[key]) && objectAfter[key] !== null) {
      return { key, status: 'nested', children: makeDiffStructure(objectBefore[key], objectAfter[key]) };
    }
    return [{
      key, value: objectBefore[key], status: 'deleted', children: [],
    },
    {
      key, value: objectAfter[key], status: 'added', children: [],
    },
    ];
  });
  return diffStructure;
};

export default makeDiffStructure;
