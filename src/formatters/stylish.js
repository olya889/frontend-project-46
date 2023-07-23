const stylish = (structureOfDiff) => {
  const makeDataAsString = (data, depth) => {
    if (typeof data === 'object' && data !== null) {
      const entries = Object.entries(data);
      const currentIndent = ' '.repeat(depth * 4);
      const bracketIndent = ' '.repeat((depth - 1) * 4);
      const stringifiedData = entries.map(([key, value]) => `${currentIndent}${key}:${makeDataAsString(value, depth + 1)}`, '');
      return [' {', ...stringifiedData, `${bracketIndent}}`].join('\n');
    }
    return ` ${(data)}`;
  };
  const iter = (diffStructure, currentDepth) => {
    const bracketInd = ' '.repeat(currentDepth * 4);
    const leftShift = ' '.repeat(currentDepth * 4 - 2);
    const formattedResult = diffStructure.reduce((acc, element) => {
      const {
        key, previousValue, value, status, children,
      } = element;
      if (status === 'added') {
        return `${acc}\n${leftShift}+ ${key}:${makeDataAsString(value, currentDepth + 1)}`;
      }
      if (status === 'deleted') {
        return `${acc}\n${leftShift}- ${key}:${makeDataAsString(value, currentDepth + 1)}`;
      }
      if (status === 'unmodified') {
        return `${acc}\n${leftShift}  ${key}:${makeDataAsString(value, 1)}`;
      }
      if (status === 'nested') {
        return `${acc}\n${leftShift}  ${key}: {${iter(children, currentDepth + 1)}\n${bracketInd}}`;
      }
      if (status === 'modified') {
        return `${acc}\n${leftShift}- ${key}:${makeDataAsString(previousValue, currentDepth + 1)}\n${leftShift}+ ${key}:${makeDataAsString(value, currentDepth + 1)}`;
      }
      return `${acc}${iter(element, currentDepth)}`;
    }, '');
    return `${formattedResult}`;
  };
  return `{${(iter(structureOfDiff, 1))}\n}`;
};

export default stylish;
