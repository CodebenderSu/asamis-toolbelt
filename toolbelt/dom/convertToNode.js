/** ---
  *
  * Generates a DOM element node and inserts raw HTML into it.
  * @example
  * // Basic usage
  * const myNode = convertToNode('<div id="example-div" class="my-div cool-div">Test node</div>');
  * // HTML node created
  * //
  * // <div id="example-div" class="my-div cool-div">
  * //   Test node
  * // </div>
  * @category Functions
  * @kind class
  * @alias convertToNode
  * @param {String} [rawHtml='<div></div>'] - A string containing valid HTML
  * @returns {Object} Element Node
  */
const convertToNode = (rawHtml = '<div></div>') => {
  const container = document.createElement('div');
  container.innerHTML = rawHtml;
  return container.children[0];
};
