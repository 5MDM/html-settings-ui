"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettingColumn = exports.SliderSetting = exports.setSliderElement = exports.ToggleSetting = exports.setToggleElement = exports.activeName = void 0;
function $(e) { return document.querySelector(e); }
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
        for (const name in opts.attrs)
            el.setAttribute(name, opts.attrs[name]);
    if (opts.style)
        for (const name in opts.style)
            el.style.setProperty(name, opts.style[name]);
    return el;
}
exports.activeName = "html-settings-ui-active";
/**
 * The base setting component which is inherited by others
 * @param {Object} o - The options object
 * @param {string} o.name - The name of the component
 * @param {string} o.id - The HTML ID of the component
 */
class BaseSetting {
    /**
     * The name of the component
     * @readonly
     * @type {string}
     */
    name;
    /**
     * The HTML ID of the component
     * @readonly
     * @type {string}
     */
    id;
    constructor(o) {
        this.name = o.name;
        this.id = o.id;
    }
}
var createToggleElement = (e, el) => el;
/**
 * Sets the function to create toggle elements
 * @param {ElFunction} f - The function whose returned element will be used when the component is created
 */
function setToggleElement(f) {
    createToggleElement = f;
}
exports.setToggleElement = setToggleElement;
/**
 * A class representing a toggle button.
 * @extends BaseSetting
 * @param {Object} o - The button options
 * @param {boolean} [o.isToggled=false] - Determines whether the button is on or off
 */
class ToggleSetting extends BaseSetting {
    /**
     * The element that the component uses
     * @readonly
     * @type {Element}
     */
    element;
    /**
     * The flag that shows if the component is toggled
     * @type {boolean}
     */
    isToggled;
    constructor(o) {
        super(o);
        this.isToggled = o.isToggled ?? false;
        const el = $$("button");
        el.addEventListener("pointerup", () => this.toggle());
        this.element = createToggleElement(this, el);
        if (this.isToggled)
            this.element.classList.add(exports.activeName);
        return this;
    }
    /**
     * A function that toggles the button component. THIS WILL NOT TRIGGER ANY EVENT LISTENERS
     */
    toggle() {
        if (this.isToggled) {
            this.isToggled = false;
        }
        else {
            this.isToggled = true;
        }
        this.element.classList.toggle(exports.activeName);
    }
}
exports.ToggleSetting = ToggleSetting;
var createSliderElement = (e, el) => el;
/**
 * Sets the function to create slider components
 * @param {ElFunction} f - The function whose returned element is used when the component is created
 */
function setSliderElement(f) {
    createSliderElement = f;
}
exports.setSliderElement = setSliderElement;
/**
 * Class representing a slider setting.
 * @extends BaseSetting
 * @param {Object} o - The slider options
 * @param {number} [o.min=0] - The slider's minimum range
 * @param {number} o.max - The slider's maximum range
 * @param {number} [o.step=1] - The steps the slider takes when being dragged
 * @param {number} o.defaultValue - The slider's default value
 */
class SliderSetting extends BaseSetting {
    /**
     * The slider's minimum range
     * @readonly
     * @type {number}
     */
    min;
    /**
     * The slider's maximum range
     * @readonly
     * @type {number}
     */
    max;
    /**
     * The steps the slider takes when being dragged
     * @readonly
     * @type {number}
     */
    step;
    /**
     * The component's default value
     * @readonly
     * @type {number}
     */
    defaultValue;
    /**
     * The element of the component
     * @readonly
     * @type {Element}
     */
    element;
    constructor(o) {
        super(o);
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
                step: this.step.toString(),
            },
        });
        this.element = createSliderElement(this, el);
    }
}
exports.SliderSetting = SliderSetting;
/**
 * A helper function that creates a column of settings and appends them to a div element.
 * @param {HTMLDivElement} main - The div element to append to
 * @param {SettingsUITypes[]} arr - An array of ToggleSetting and SliderSetting instances
 */
function createSettingColumn(main, arr) {
    for (const { element } of arr) {
        main.appendChild(element);
    }
}
exports.createSettingColumn = createSettingColumn;
