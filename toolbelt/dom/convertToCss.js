/** ---
  *
  * Generates a style tag in the DOM containing CSS.
  * @example
  * // Basic usage
  * convertToCss(`.myStyles { color: black; font-size: 12px;}`);
  * // Style tag created
  * //
  * // <style type="text/css">
  * //   .myStyles {
  * //     color: black;
  * //     font-size: 12px;
  * //   }
  * // </style>
  * @category Functions
  * @kind class
  * @alias convertToCss
  * @param {String} rawCss - A string containing valid CSS
  * @returns null
  */
const convertToCss = (rawCss) => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = rawCss;

  window.addEventListener('DOMContentLoaded', async (e) => {
    document.getElementsByTagName('head')[0].appendChild(style);
  });
};
