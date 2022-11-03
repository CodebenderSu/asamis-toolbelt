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
