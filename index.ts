
function $(e: string): any 
{return document.querySelector(e)}

interface $$Opts {
  attrs?: {[key: string]: string},
  style?: {[key: string]: string},
  children?: HTMLElement[],
  listeners?: string,
  up?: (e: any) => void,
  down?: (e: any) => void,
  text?: string,
}

function $$
<N extends keyof HTMLElementTagNameMap>
(name: N, opts?: $$Opts): HTMLElementTagNameMap[N] {
  const el: HTMLElementTagNameMap[N] = 
  document.createElement(name) as 
  HTMLElementTagNameMap[N];

  if(!opts) return el;

  if(opts.text) el.innerText = opts.text;

  if(opts.children) 
    for(const i of opts.children)
      el.appendChild(i);

  if(opts.up)
    el.addEventListener("pointerup", opts.up);

  if(opts.down)
    el.addEventListener("pointerdown", opts.down);

  if(opts.attrs)
    for(const name in opts.attrs)
      el.setAttribute(name, opts.attrs[name]);

  if(opts.style)
    for(const name in opts.style)
      el.style.setProperty(name, opts.style[name]);

  return el;
}

export const activeName = "html-settings-ui-active";

interface BaseSettingOpts {
  name: string;
  id: string;
}

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
  readonly name: string;
  
  /**
   * The HTML ID of the component
   * @readonly
   * @type {string}
   */
  readonly id: string;
  
  constructor(o: BaseSettingOpts) {
    this.name = o.name;
    this.id = o.id;
  }
}

interface ToggleSettingOpts extends BaseSettingOpts {
  isToggled?: boolean;
}

type ElFunction = ((e: any, el: HTMLElement) => HTMLElement);

var createToggleElement: ElFunction = (e, el) => el;

/**
 * Sets the function to create toggle elements
 * @param {ElFunction} f - The function whose returned element will be used when the component is created
 */

export function setToggleElement(f: ElFunction) {
  createToggleElement = f;
}

/**
 * A class representing a toggle button. 
 * @extends BaseSetting
 * @param {Object} o - The button options
 * @param {boolean} [o.isToggled=false] - Determines whether the button is on or off
 */

export class ToggleSetting extends BaseSetting {
  /**
   * The element that the component uses
   * @readonly
   * @type {Element}
   */
  readonly element: Element;
  
  /**
   * The flag that shows if the component is toggled
   * @type {boolean}
   */
  isToggled: boolean;
  
  constructor(o: ToggleSettingOpts) {
    super(o);
    this.isToggled = o.isToggled ?? false;
    
    const el = $$("button");
    el.addEventListener("pointerup", () => this.toggle());
    
    this.element = createToggleElement(this, el);
    if(this.isToggled) this.element.classList.add(activeName);
    
    return this;
  }
  
  /**
   * A function that toggles the button component. THIS WILL NOT TRIGGER ANY EVENT LISTENERS
   */
  
  toggle(): void {
    if(this.isToggled) {
      this.isToggled = false;
    } else {
      this.isToggled = true;
    }
    this.element.classList.toggle(activeName);
  }
}

interface SliderSettingOpts extends BaseSettingOpts {
  min?: number;
  max: number;
  step?: number;
  defaultValue: number;
}

var createSliderElement: ElFunction = (e, el) => el;

/**
 * Sets the function to create slider components
 * @param {ElFunction} f - The function whose returned element is used when the component is created
 */

export function setSliderElement(f: ElFunction) {
  createSliderElement = f;
}

/**
 * Class representing a slider setting.
 * @extends BaseSetting
 * @param {Object} o - The slider options
 * @param {number} [o.min=0] - The slider's minimum range
 * @param {number} o.max - The slider's maximum range
 * @param {number} [o.step=1] - The steps the slider takes when being dragged
 * @param {number} o.defaultValue - The slider's default value
 */

export class SliderSetting extends BaseSetting {
  /**
   * The slider's minimum range
   * @readonly
   * @type {number}
   */
  readonly min: number;
  
  /**
   * The slider's maximum range
   * @readonly
   * @type {number}
   */
  readonly max: number;
  
  /**
   * The steps the slider takes when being dragged
   * @readonly
   * @type {number}
   */
  readonly step: number;
  
  /**
   * The component's default value
   * @readonly
   * @type {number}
   */
  readonly defaultValue: number;
  
  /**
   * The element of the component
   * @readonly
   * @type {Element}
   */
  readonly element: Element;
  
  constructor(o: SliderSettingOpts) {
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

/**
 * The type for all settings components from this library
 * @typedef {(ToggleSetting | SliderSetting)} SettingsUITypes
 */

type SettingsUITypes = ToggleSetting | SliderSetting;

/**
 * A helper function that creates a column of settings and appends them to a div element.
 * @param {HTMLDivElement} main - The div element to append to
 * @param {SettingsUITypes[]} arr - An array of ToggleSetting and SliderSetting instances
 */

export function createSettingColumn(main: HTMLDivElement, arr: SettingsUITypes[]) {
  for(const {element} of arr) {
    main.appendChild(element);
  }
}
