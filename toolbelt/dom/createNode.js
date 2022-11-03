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
