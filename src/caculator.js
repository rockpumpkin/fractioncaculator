/*
Coding Challenge
Write a command line program in the language of your choice that
will take operations on fractions as an input and produce a fractional result.
Legal operators shall be *, /, +, - (multiply, divide, add, subtract)
Operands and operators shall be separated by one or more spaces
Mixed numbers will be represented by whole_numerator/denominator. e.g. “3_1/4”
Improper fractions and whole numbers are also allowed as operands.
examples:
? 1/2 * 3_3/4
= 1_7/8
? 2_3/8 + 9/8
3_1/2

*/

// const fc = require('fraction-calculator');
import fc from 'fraction-calculator';

// build stack to caculate the final result
function buildStack(num, opr, stack) {
  if (num === '') return;
  switch (opr) {
    case '+':
      stack.push(fc(num).toFraction());
      break;
    case '-':
      stack.push(fc(num).neg().toFraction());
      break;
    case '*':
      stack.push(fc(stack.pop()).times(num).toFraction());
      break;
    case '/':
      stack.push(fc(stack.pop()).div(num).toFraction());
      break;
    default:
      console.log('no result');
  }
}

// add up all the value in stack
function addUp(arr) {
  let result = '0';
  for (let i = 0; i < arr.length; i += 1) {
    result = fc(result).plus(arr[i]).toFraction();
  }
  return result;
}
// change the result to proper fraction
function toProperFraction(nums) {
  let num = nums;
  let sign = '';
  if (num.startsWith('-')) {
    sign = '-';
    num = num.substring(1);
  }
  const se = num.split('/');
  if (se.length < 2) return nums;
  let n = parseInt(se[0], 10);
  const d = parseInt(se[1], 10);
  if (n <= d) return nums;
  const i = parseInt(n / d, 10);
  n -= i * d;
  return `${sign}${i} ${n}/${d}`;
}

// main function
export default function caculate(a) {
  let s = a;
  if (s.includes('=')) s = s.substring(2);
  s = s.trim();
  const stack = [];
  if (!s || s.length === 0) return 0;
  let num = '';
  const len = s.length;
  let sign = '+';
  let i = 0;
  while (i < len) {
    if (s[i] !== ' ') {
      num += s[i];
      i += 1;
    }
    if ((s[i] === ' ' || i === len)) {
      num = num.replace('_', ' ');
      try {
        fc(num);
      } catch (error) {
        console.log(`input fraction is invalid ${error}`);
        return NaN;
      }
      buildStack(num, sign, stack);
      while (i < len && s[i] === ' ') i += 1;
      if (i < len) {
        sign = s[i];
        i += 1;
      }
      num = '';
      while (i < len && s[i] === ' ') i += 1;
    }
  }

  if (stack.length === 0) return a;
  const re = addUp(stack);
  return toProperFraction(re);
}
