#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Tool to work with files')
  .version('0.0.1');

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information');

program.parse();
