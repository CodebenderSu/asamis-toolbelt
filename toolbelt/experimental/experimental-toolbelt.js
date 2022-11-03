////////////////////////////////////////////////////////////////////////////////
//////////////////// +-+-+ // EXPERIMENTAL TOOLBELT // +-+-+ ///////////////////
////////////////////////////////////////////////////////////////////////////////
///////// WARNING: These functions may only be half-baked and might not ////////
///////////// consistently work as intended. Use at your own peril. ////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// TYPE VALIDATION //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**  ---
  *
  * Checks for whether provided **data** is one of the provided data **types**.
  *
  * @example
  * const types = ['string', 'array'];
  * const a = 'foo';
  * const b = 12345;
  * console.log(isOneTypeof(types, a), isOneTypeof(types, b));
  * // returns true, false;
  * @category Functions
  * @kind class
  * @alias isOneTypeof
  * @implements isType
  * @param {Array} types - An array of strings of different data types to check for
  * @param {*} data - Data to check
  * @returns {Boolean}
  */
export const isOneTypeof = (types = ['string'], data) => {
  let res = false;
  types.forEach(type => {
    if (isType(type, data)) res = true; // Fix so will work with type=boolean data=false
  });
  return res;
};
/**  ---
  *
  * Checks for whether provided **data** typeof matches **type**.
  *
  * @example
  * const type = 'string';
  * const a = 'foo';
  * const b = 12345;
  * console.log(isType(type, a), isType(type, b));
  * // returns true, false;
  * @category Functions
  * @kind class
  * @alias isType
  * @param {String} type - A string describing the data type to compare
  * @param {*} data - Data to check
  * @param {Boolean} [shouldCoerceData=false] - If data isn't of provided type, attempt to convert it to that type
  * @param {*} [defaultValue=false] - A fallback value to convert the data to incase function cannot coerce data
  */
export const isType = (type = 'string', data, shouldCoerceData = false, defaultValue = false) => {
  let res = data;
  switch (type.toUpperCase()) {
    case 'STRING': /* Falls through */
    case 'NUMBER': /* Falls through */
    case 'BOOLEAN':
      if (typeof data !== type.toLowerCase()) {
        if (shouldCoerceData) {
          res = convertToType(type, data);
        } else {
          res = defaultValue;
        };
      };
      break;
    case 'ARRAY':
      if (!Array.isArray(data)) {
        if (shouldCoerceData) {
          res = convertToType(type, data);
        } else {
          res = defaultValue;
        };
      };
      break;
    case 'OBJECT':
      if (typeof data !== type.toLowerCase() || Array.isArray(data) || data === null) {
        if (shouldCoerceData) {
          res = convertToType(type, data);
        } else {
          res = defaultValue;
        };
      };
      break;
    case 'NULL':
      if (data !== null) {
        res = defaultValue;
      };
      break;
    default:
      break;
  };
  return res;
};
/**  ---
  *
  * Attempts to convert provided **data** to another **type**.
  *
  * @example
  * const type = 'string';
  * const a = 123;
  * const b = [1,2,3];
  * console.log(convertToType(type, a), convertToType(type, b));
  * // returns '123', '[1,2,3]';
  * @category Functions
  * @kind class
  * @alias convertToType
  * @param {String} type - A string describing the data type to convert to
  * @param {*} data - Data to convert
  * @returns {*} res - Converted data
  */
export const convertToType = (type = 'string', data) => {
  let res = data;
  switch (type.toUpperCase()) {
    case 'STRING':
      res = convertToTypeString(data); break;
    case 'NUMBER':
      res = convertToTypeNumber(data); break;
    case 'BOOLEAN':
      res = convertToTypeBoolean(data); break;
    case 'ARRAY':
      res = convertToTypeArray(data); break;
    case 'OBJECT':
      res = convertToTypeObject(data); break;
    default:
      break;
  };
  return res;
};
/**  ---
  *
  * Converts **data** to typeof String.
  *
  * @category Functions
  * @kind class
  * @alias convertToTypeString
  * @param {*} data - Data to convert
  * @returns {*} res - Converted data
  */
export const convertToTypeString = (data) => {
  let res = data;
  switch (typeof data) {
    case 'number': /* Falls through */
    case 'boolean':
      res = data.toString(); break;
    case 'object':
      if (Array.isArray(data)) {
        res = data.join(' ');
      } else {
        res = JSON.stringify(data);
      };
      break;
    default:
      break;
  };
  return res;
};
/**  ---
  *
  * Converts **data** to typeof Number.
  *
  * @category Functions
  * @kind class
  * @alias convertToTypeNumber
  * @param {*} data - Data to convert
  * @returns {*} res - Converted data
  */
export const convertToTypeNumber = (data) => {
  let res = data;
  switch (typeof data) {
    case 'string':
      res = parseFloat(data); break;
    case 'boolean':
      res = +data; break;
    default:
      break;
  };
  return res;
};
/**  ---
  *
  * Converts **data** to typeof Boolean.
  *
  * @category Functions
  * @kind class
  * @alias convertToTypeBoolean
  * @param {*} data - Data to convert
  * @returns {*} res - Converted data
  */
export const convertToTypeBoolean = (data) => {
  let res = data;
  if (data) {
    res = true;
  } else {
    res = false;
  };
  return res;
};
/**  ---
  *
  * Converts **data** to typeof Array.
  *
  * @category Functions
  * @kind class
  * @alias convertToTypeArray
  * @param {*} data - Data to convert
  * @returns {*} res - Converted data
  */
export const convertToTypeArray = (data) => {
  let res = data;
  switch (typeof data) {
    case 'string': /* Falls through */
    case 'number': /* Falls through */
    case 'boolean':
      res = [ data ]; break;
    case 'object':
      if (!Array.isArray(data) && data !== null) {
        res = [];
        for (let i in data) { res = [ ...res, data[i] ] };
      };
      break;
    default:
      break;
  };
  return res;
};
/**  ---
  *
  * Converts **data** to typeof Object.
  *
  * @category Functions
  * @kind class
  * @alias convertToTypeObject
  * @param {*} data - Data to convert
  * @returns {*} res - Converted data
  */
export const convertToTypeObject = (data) => {
  let res = data;
  switch (typeof data) {
    case 'string': /* Falls through */
    case 'number': /* Falls through */
    case 'boolean':
      res = { 0: data }; break;
    case 'object': // Convert arrays to objects
      if (Array.isArray(data)) {
        res = {}; let key = 0;
        data.forEach(i => {
          res = { ...res, [key]: i }; key++;
        });
      };
      break;
    default:
      break;
  };
  return data;
};
