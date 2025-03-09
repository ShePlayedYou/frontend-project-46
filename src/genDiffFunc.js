import { Command } from 'commander';

const gendiff = new Command();

gendiff
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .parse();

export default gendiff;
