/** ---
  *
  * Filters objects from an array that match those in another array.
  * @example
  * // Basic usage
  * const a = [{bar: 1, bas: true}];
  * const b = [{foo: 'hello world'}, {bar: 1, bas: true}];
  * //
  * const c = filterObjects(a, b);
  * console.log(c);
  * // [{foo: 'hello world'}];
  * @category Functions
  * @kind class
  * @alias filterObjects
  * @param {Array} arrA - Array to filter by
  * @param {Array} arrB - Array to be filtered
  * @returns {Array} Filtered array
  */
export const filterObjects = (arrA, arrB) => {
  let arrC = [];
  // console.log(arrA, arrB)
  // Filter objects from arrB that match objects in arrA
  arrB.forEach(b => { // Each object in arrB
    let match = true;
    arrA.forEach(a => { // Each object in arrA
      let matches = true; // Track whether a matches b
      for (let key in a) { // Each key in object
        if (a[key] !== b[key]) {
          // console.log(`no match between ${a[key]} and ${b[key]}`);
          matches = false; // non-matching key-value pairs, a does not match b
        };
      };
      if (!matches) console.log('no matches'); match = false; // if a doesn't match b, update match
    });
    if (!match) console.log(`no match, push ${b}`); arrC.push(b);
  });
  return arrC;
};
