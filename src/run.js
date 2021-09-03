/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import caculate from './caculator.js';

const input = process.argv;
const inputString = input[2];
console.log(caculate(inputString));
