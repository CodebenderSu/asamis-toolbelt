/** ---
  *
  * Generates a randomized key from a set of props, appending a randomly
  * generated number to the output.
  *
  * @example
  * const key = generateKey(['random', 'key']);
  * console.log(key);
  * // returns '98765432_random_key';
  * @category Functions
  * @kind class
  * @alias generateKey
  * @param {Array} props - A set of props to add to the key
  * @returns {String} Key
  */
export const generateKey = (props = []) => {
  const randomInt = Math.floor(Math.random() * 100000000);
  let key = randomInt;
  props.forEach(prop => {
    key = `${key}_${prop}`
  });
  return key;
};
