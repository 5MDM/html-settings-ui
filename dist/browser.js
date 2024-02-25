"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function $(e) {
  return document.querySelector(e);
}
function $$(name, opts) {
  const el = document.createElement(name);
  if (!opts)
    return el;
  if (opts.text)
    el.innerText = opts.text;
  if (opts.children)
    for (const i of opts.children)
      el.appendChild(i);
  if (opts.up)
    el.addEventListener("pointerup", opts.up);
  if (opts.down)
    el.addEventListener("pointerdown", opts.down);
  if (opts.attrs)
    for (const name2 in opts.attrs)
      el.setAttribute(name2, opts.attrs[name2]);
  if (opts.style)
    for (const name2 in opts.style)
      el.style.setProperty(name2, opts.style[name2]);
  return el;
}
export const activeName = "html-settings-ui-active";
class BaseSetting {
  constructor(o) {
    /**
     * The name of the component
     * @readonly
     * @type {string}
     */
    __publicField(this, "name");
    /**
     * The HTML ID of the component
     * @readonly
     * @type {string}
     */
    __publicField(this, "id");
    this.name = o.name;
    this.id = o.id;
  }
}
var createToggleElement = (e, el) => el;
export function setToggleElement(f) {
  createToggleElement = f;
}
export class ToggleSetting extends BaseSetting {
  constructor(o) {
    var _a;
    super(o);
    /**
     * The element that the component uses
     * @readonly
     * @type {Element}
     */
    __publicField(this, "element");
    /**
     * The flag that shows if the component is toggled
     * @type {boolean}
     */
    __publicField(this, "isToggled");
    this.isToggled = (_a = o.isToggled) != null ? _a : false;
    const el = $$("button");
    el.addEventListener("pointerup", () => this.toggle());
    this.element = createToggleElement(this, el);
    if (this.isToggled)
      this.element.classList.add(activeName);
    return this;
  }
  /**
   * A function that toggles the button component. THIS WILL NOT TRIGGER ANY EVENT LISTENERS
   */
  toggle() {
    if (this.isToggled) {
      this.isToggled = false;
    } else {
      this.isToggled = true;
    }
    this.element.classList.toggle(activeName);
  }
}
var createSliderElement = (e, el) => el;
export function setSliderElement(f) {
  createSliderElement = f;
}
export class SliderSetting extends BaseSetting {
  constructor(o) {
    super(o);
    /**
     * The slider's minimum range
     * @readonly
     * @type {number}
     */
    __publicField(this, "min");
    /**
     * The slider's maximum range
     * @readonly
     * @type {number}
     */
    __publicField(this, "max");
    /**
     * The steps the slider takes when being dragged
     * @readonly
     * @type {number}
     */
    __publicField(this, "step");
    /**
     * The component's default value
     * @readonly
     * @type {number}
     */
    __publicField(this, "defaultValue");
    /**
     * The element of the component
     * @readonly
     * @type {Element}
     */
    __publicField(this, "element");
    this.min = o.min || 0;
    this.max = o.max;
    this.step = o.step || 1;
    this.defaultValue = o.defaultValue;
    const el = $$("input", {
      attrs: {
        type: "range",
        min: this.min.toString(),
        max: this.max.toString(),
        value: this.defaultValue.toString(),
        step: this.step.toString()
      }
    });
    this.element = createSliderElement(this, el);
  }
}
export function createSettingColumn(main, arr) {
  for (const { element } of arr) {
    main.appendChild(element);
  }
}
