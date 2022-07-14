////////////////////////////////////////////////////////////////////////////////
////////////////////// +-+-+ // ASAMI'S TOOLBELT // +-+-+ //////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////////// A collection of utility functions for JavaScript ///////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// CORE TOOLS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// DATA FORMATTERS //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
/** ---
  *
  * Customizable date formatter function.
  *
  * Valid format selectors:
  * * **"YYYY"** - Full year (ie. 2020)
  * * **"YY"** - Shortened year (ie. 20)
  * * **"M"** - Full month (ie. November)
  * * **"MM"** - Month number (ie. 11)
  * * **"MMM"** - Abbreviated month (ie. Nov)
  * * **"D"** - Single letter weekday (ie. U)
  * * **"DD"** - Full weekday (ie. Sunday)
  * * **"DDD"** - Abbreviated weekday (ie. Sun)
  * * **"dd"** - Day (ie. 20)
  * * **"hh"** - Hour (ie. 11)
  * * **"mm"** - Minutes (ie. 59)
  * * **"ss"** - Seconds (ie. 45)
  * * **"-"** - Prefix that can be added before any key to disable spacing between that key and the one before it
  * * **"*"** - Anything that does not fit the above keys will itself be added as an unchanged string
  * @example
  * // With default date format (UTC)
  * const date = dateFormatter(1605890384);
  * console.log(date); // 'Fri Nov 20, 2020 16:39:44'
  * @example
  * // With custom date format (UTC)
  * const date = dateFormatter(1605890384, 'DD -, M dd -, YYYY @ -hh -: -mm');
  * console.log(date); // 'Friday, November 20, 2020 @16:39'
  * @category Functions
  * @kind class
  * @alias dateFormatter
  * @param {Object} rawDate - A valid date object
  * @param {String} [format='DDD MMM dd -, YYYY hh -: -mm -: -ss'] - A customized format string
  * @returns {String} Date
  */
export const dateFormatter = (rawDate, format = 'DDD MMM dd -, YYYY hh -: -mm -: -ss') => {
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const abrvMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const abrvWeekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const digitWeekdays = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
  const dateObj = new Date(parseInt(rawDate));
  if (dateObj.toString() === 'Invalid Date') {
    console.error(`Provided 'rawDate' parameter for dateFormatter() function is an invalid date value: `, rawDate);
    return;
  };
  const fullYear = dateObj.getFullYear();
  const abrvYear = fullYear.toString().slice(2,4);
  const fullMonth = fullMonths[dateObj.getMonth()];
  const abrvMonth = abrvMonths[dateObj.getMonth()];
  const fullWeekday = fullWeekdays[dateObj.getDay()];
  const abrvWeekday = abrvWeekdays[dateObj.getDay()];
  const digitWeekday = digitWeekdays[dateObj.getDay()];
  const month = dateObj.getMonth() < 10 ? `0${dateObj.getMonth()}` : dateObj.getMonth();
  const date = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
  const hour = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
  const minutes = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();
  const seconds = dateObj.getSeconds() < 10 ? `0${dateObj.getSeconds()}` : dateObj.getSeconds();
  const formatArr = typeof format === 'string' ? format.split(' ') : format;
  if (!Array.isArray(formatArr)) {
    console.error(`Provided 'format' parameter for dateFormatter() function is neither a string nor an array: Invalid data type`);
    return;
  };
  let formattedDate = '';
  formatArr.forEach(i => {
    let addSpace = true; // By default, add spacing between keys
    let key = i;
    if (i.length > 1 && i[0] === '-') { // Check for "-" prefix to disable spacing
      addSpace = false;
      key = i.slice(1);
    };
    if (i === formatArr[0]) { // Disable space before first key
      addSpace = false;
    };
    switch (key) {
      case 'YYYY':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${fullYear}`; break;
      case 'YY':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${abrvYear}`; break;
      case 'M':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${fullMonth}`; break;
      case 'MM':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${month}`; break;
      case 'MMM':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${abrvMonth}`; break;
      case 'D':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${digitWeekday}`; break;
      case 'DD':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${fullWeekday}`; break;
      case 'DDD':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${abrvWeekday}`; break;
      case 'dd':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${date}`; break;
      case 'hh':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${hour}`; break;
      case 'mm':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${minutes}`; break;
      case 'ss':
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${seconds}`; break;
      default:
        formattedDate = `${formattedDate}${addSpace ? ' ' : ''}${key}`;
    };
  });
  return formattedDate;
};

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// DOM MANIPULATION /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/** ---
  *
  * Generates a DOM element node from various parameter settings.
  * @example
  * // Basic usage
  * const myDiv = createNode('div', 'Test node', 'example-div', 'my-div cool-div');
  * // HTML node created
  * //
  * // <div id="example-div" class="my-div cool-div">
  * //   Test node
  * // </div>
  * @example
  * // Advanced usage with children, attributes, and event handlers
  * const handleClick = () => console.log('Ping!');
  * const coolDiv = createNode(
  *   'div',
  *   '',
  *   '',
  *   'cool-div',
  *   [myDiv],
  *   { title: 'This is a cool div!'},
  *   { onClick: handleClick() }
  * );
  * // HTML node created
  * //
  * // <div class="cool-div" title="This is a cool div!" onclick={e=>handleClick(e)}>
  * //   <div id="example-div" class="my-div cool-div">
  * //     Test node
  * //   </div>
  * // </div>
  * @category Functions
  * @kind class
  * @alias createNode
  * @param {String} [element='div'] - A tag type for the element node container
  * @param {String} [innerText=''] - Some text within the element node
  * @param {String} [id=''] - Id attribute name for element node
  * @param {String} [className=''] - Class attribute string for element node
  * @param {Array} [children=[]] - Array of element nodes to set as children in order
  * @param {Object} [attributes={}] - Object of attribute key and string value pairs to set on the element node
  * @param {Object} [events={}] - Object of event type key and event handler function value pairs to set on the element node
  * @returns {Object} Element Node
  */
export const createNode = (element = 'div', innerText = '', id = '', className = '', children = [], attributes = {}, events = {}) => {
  const node = document.createElement(element);
  const text = document.createTextNode(innerText);
  id ? node.id = id : null;
  className ? node.className = className : null;
  innerText ? node.appendChild(text) : null;
  if (children.length > 0) {
    children.forEach(child => node.appendChild(child));
  };
  if (Object.keys(attributes).length > 0) {
    Object.keys(attributes).forEach(attr => node.setAttribute(attr, attributes[attr]));
  };
  if (Object.keys(events).length > 0) {
    Object.keys(events).forEach(evt => node.addEventListener(evt, events[evt], false));
  };
  return node;
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// REST SERVICES ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
  * Creates an XMLHttpRequest instance as a promise for use with async/await
  */
export const promisedXHR = (method, uri, data = null, mimeType = 'application/json') => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, `${uri?uri:''}`);
    // xhr.overrideMimeType(mimeType);
    xhr.setRequestHeader('Content-Type', mimeType);
    xhr.onload = () => {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
    };
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(data);
  });
};
