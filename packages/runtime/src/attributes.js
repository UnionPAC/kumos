/**
 *
 * Sets the attributes of an element
 *
 * Note: It does NOT remove attributes that are not present in the new attributes, except in the case of the `class` attribute.
 *
 * @param {HTMLElement} el element to add attributes to
 * @param {object} attributes attributes to set
 */
export function setAttributes(el, attributes) {
  const { class: className, style, ...otherAttributes } = attributes;

  // set class
  if (className) {
    setClass(el, className);
  }

  // set style
  if (style) {
    Object.entries(style).forEach(([propName, value]) => {
      setStyle(el, propName, value);
    });
  }

  // set other attributes
  for (const [key, value] of Object.entries(otherAttributes)) {
    setAttribute(el, key, value);
  }
}

/**
 * 
 * Adds class name to an HTML element
 *
 * @param {HTMLElement} el The element to add the class name to
 * @param {(string | array)} className The class name which to add
 */
export function setClass(el, className) {
  el.className = "";

  // handle if className passed in as string
  if (typeof className === "string") {
    el.className = className;
  }

  // handle if className passed in as an array
  if (Array.isArray(className)) {
    el.classList.add(...className);
  }
}

/**
 * Sets the style on the element
 *
 * @param {HTMLElement} el The element to add the style to
 * @param {string} name The name of the style property
 * @param {string} value The value given to the style property
 */
export function setStyle(el, name, value) {
  el.style[name] = value;
}

/**
 * Removes a style from an element
 *
 * @param {HTMLElement} el The element to remove the style from
 * @param {string} name The name of the style property
 */
export function removeStyle(el, name) {
  el.style[name] = null;
}

/**
 * Sets the attribute on the element.
 *
 * @param {Element} el The element to add the attribute to
 * @param {string} name The name of the attribute
 * @param {(string|number|null)} value The value of the attribute
 */
export function setAttribute(el, name, value) {
  // remove attribute if null
  if (value === null) {
    removeAttribute(el, name);
  } else if (name.startsWith("data-")) {
    el.setAttribute(name, value);
  } else {
    el[name] = value;
  }
}

/**
 * Removes the attribute from the element.
 *
 * @param {Element} el the element where the attribute is set
 * @param {string} name name of the attribute
 */
export function removeAttribute(el, name) {
  try {
    el[name] = null;
  } catch (error) {
    // Setting 'size' to null on an <input> throws an error.
    // Removing the attribute instead works. (Done below.)
    console.warn(`Failed to set "${name}" to null on ${el.tagName}`);
  }

  el.removeAttribute(name);
}
