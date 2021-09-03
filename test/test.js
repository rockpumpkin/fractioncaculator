/* eslint-disable no-undef */

import { assert } from 'chai';
// eslint-disable-next-line import/extensions
import caculate from '../src/caculator.js';

describe('caculator test', () => {
  it('Test case 1 - Add', () => {
    const input = '1_1/2 + 1';
    const pr = caculate(input);
    assert.equal(pr, '2 1/2', 'plus test fail');
  });
  it('Test case 2 - Multiple', () => {
    const input = '1_1/2 * 1_1/6';
    const pr = caculate(input);
    assert.equal(pr, '1 3/4', 'multiple test fail');
  });
  it('Test case 3 - Subtract', () => {
    const input = '1_1/2 - 1_1/6';
    const pr = caculate(input);
    assert.equal(pr, '1/3', 'minus test fail');
  });
  it('Test case 4 - Subtract 2', () => {
    const input = '1_1/2 - 2';
    const pr = caculate(input);
    assert.equal(pr, '-1/2', 'minus test fail');
  });
  it('Test case 5 - Divide', () => {
    const input = '1_1/2 / -1/2';
    const pr = caculate(input);
    assert.equal(pr, '-3', 'divide test fail');
  });
  it('Test case 6 - Invalid test - input a string instead of number', () => {
    const input = 'a';
    const pr = caculate(input);
    assert.include(pr.toString(), 'NaN', 'Error not return');
  });
});
