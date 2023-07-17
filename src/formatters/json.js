const json = (structureOfDiff) => {
  const makeDataAsString = (data, depth) => {
    if (typeof data === 'string') {
      return `"${(data)}"`;
    }
    if (typeof data === 'object' && data !== null) {
      const entries = Object.entries(data);
      const currentIndent = ' '.repeat((depth + 1) * 4);
      const bracketIndent = ' '.repeat(depth * 4);
      const stringifiedData = entries.map(([key, value]) => `\n${currentIndent}"${key}": ${makeDataAsString(value, depth + 1)}`);
      return `{${[...stringifiedData].join(',')}\n${bracketIndent}}`;
    }
    return `${data}`;
  };
  const iter = (structure, depth) => {
    const currentIndent = ' '.repeat(depth * 4);
    const valueIntend = ' '.repeat((depth + 1) * 4);
    const bracketIntend = ' '.repeat(depth * 4);
    const lines = structure
      .map((element) => {
        const {
          key, value, status, children,
        } = element;
        if (Array.isArray(element)) {
          const [element1, element2] = element;
          return `${currentIndent}"${element1.key}": {\n${valueIntend}"value": ${makeDataAsString(element2.value, depth + 1)},\n${valueIntend}"initial value": ${makeDataAsString(element1.value, depth + 1)},\n${valueIntend}"status": "updated"\n${bracketIntend}}`;
        }
        if (status === 'unmodified') {
          return `${currentIndent}"${key}": ${makeDataAsString(value, depth + 1)}`;
        }
        if (status === 'nested') {
          return `${currentIndent}"${key}": {\n${iter(children, depth + 1)}\n${bracketIntend}}`;
        }
        return `${currentIndent}"${key}": {\n${valueIntend}"value": ${makeDataAsString(value, depth + 1)},\n${valueIntend}"status": "${status}"\n${bracketIntend}}`;
      });
    return [...lines].join(',\n');
  };
  return `{\n${iter(structureOfDiff, 1)}\n}`;
};

export default json;
