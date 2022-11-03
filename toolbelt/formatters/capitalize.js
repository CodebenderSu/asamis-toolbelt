/** ---
  *
  * Capitalizes the first letter of a given string.
  * @example
  * let str = 'the quick brown fox...';
  * str = capitalize(str);
  * console.log(str); // 'The quick brown fox...';
  * @category Functions
  * @kind class
  * @alias capitalize
  * @param {String} str - Given string to be capitalized
  * @returns {String} str with first letter capitalized
  */
export const capitalize = (string) => {
  if (typeof string !== 'string') {
    console.error(`The variable provided for fn: capitalize(string); is not a string\n`, string);
    return '';
  };
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};
/**
  * Capitalize each word in a string
  */
export const capitalizeEach = (string) => {
  if (typeof string !== 'string') {
    console.error(`The variable provided for fn: capitalizeEach(string); is not a string\n`, string);
    return '';
  };
  const input = string.split(' '); const output = [];
  input.forEach(i => output.push(capitalize(i)));
  return output.join(' ');
};
