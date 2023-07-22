# Difference calculator

## Hexlet tests and linter status:
[![Actions Status](https://github.com/olya889/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/olya889/frontend-project-46/actions)

[![gendiff](https://github.com/olya889/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)](https://github.com/olya889/frontend-project-46/actions/workflows/gendiff.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/3acdf5dae7c83ab1953c/maintainability)](https://codeclimate.com/github/olya889/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/3acdf5dae7c83ab1953c/test_coverage)](https://codeclimate.com/github/olya889/frontend-project-46/test_coverage)

**Difference calculator**  - the program which determines the difference between two data structures.
The utility supports different input data formats (json, yaml) and can generate report in plain text, stylish and json.

## Setup

```bash
make install

npm link
```

## Run

### JSON input data format

```bash
gendiff file1.json file2.json  
```

[![asciicast](https://asciinema.org/a/XWZ7yLW9xwfEQ5W5llqIV6wre.svg)](https://asciinema.org/a/XWZ7yLW9xwfEQ5W5llqIV6wre)

### YAML input data format

```bash
gendiff file1.yml file2.yml
gendiff file1.yaml file2.yaml
```

[![asciicast](https://asciinema.org/a/9wVumQR1EkZf3q9aO6kBgtYIk.svg)](https://asciinema.org/a/9wVumQR1EkZf3q9aO6kBgtYIk)


### Stylish format

```bash
gendiff filepath1 filepath2
```

[![asciicast](https://asciinema.org/a/596086.svg)](https://asciinema.org/a/596086)

### Plain format

```bash
gendiff -f plain filepath1 filepath2  
```

[![asciicast](https://asciinema.org/a/5IDN2Hec1y1YSP6NEpAfBB1GH.svg)](https://asciinema.org/a/5IDN2Hec1y1YSP6NEpAfBB1GH)

### JSON format

```bash
gendiff -f json filepath1 filepath2  
```

[![asciicast](https://asciinema.org/a/597283.svg)](https://asciinema.org/a/597283)

