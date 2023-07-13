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
          key, value, status, children,
        } = element;
        if (Array.isArray(element)) {
          const [element1, element2] = element;
          return `Property '${propertie}${element1.key}' was updated. From ${makeDataAsString(element1.value)} to ${makeDataAsString(element2.value)}`;
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
