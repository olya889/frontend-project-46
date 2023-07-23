const plain = (structureOfDiff) => {
  const makeDataAsString = (data) => {
    if (typeof data === 'object' && data !== null) {
      return '[complex value]';
    }
    if (typeof data === 'string') {
      return `'${(data)}'`;
    }
    return `${(data)}`;
  };
  const iter = (structure, propertie) => {
    const lines = structure
      .map((element) => {
        const {
          key, previousValue, value, status, children,
        } = element;
        if (status === 'modified') {
          return `Property '${propertie}${key}' was updated. From ${makeDataAsString(previousValue)} to ${makeDataAsString(value)}`;
        }
        if (status === 'added') {
          return `Property '${propertie}${key}' was added with value: ${makeDataAsString(value)}`;
        }
        if (status === 'deleted') {
          return `Property '${propertie}${key}' was removed`;
        }
        if (status === 'nested') {
          const newPropertie = `${propertie}${key}.`;
          return iter(children, newPropertie);
        }
        return null;
      })
      .filter((line) => line !== null);
    return [...lines].join('\n');
  };
  return iter(structureOfDiff, '');
};

export default plain;
