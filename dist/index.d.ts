export declare const activeName = "html-settings-ui-active";
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
declare class BaseSetting {
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
    constructor(o: BaseSettingOpts);
}
interface ToggleSettingOpts extends BaseSettingOpts {
    isToggled?: boolean;
}
type ElFunction = ((e: any, el: HTMLElement) => HTMLElement);
/**
 * Sets the function to create toggle elements
 * @param {ElFunction} f - The function whose returned element will be used when the component is created
 */
export declare function setToggleElement(f: ElFunction): void;
/**
 * A class representing a toggle button.
 * @extends BaseSetting
 * @param {Object} o - The button options
 * @param {boolean} [o.isToggled=false] - Determines whether the button is on or off
 */
export declare class ToggleSetting extends BaseSetting {
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
    constructor(o: ToggleSettingOpts);
    /**
     * A function that toggles the button component. THIS WILL NOT TRIGGER ANY EVENT LISTENERS
     */
    toggle(): void;
}
interface SliderSettingOpts extends BaseSettingOpts {
    min?: number;
    max: number;
    step?: number;
    defaultValue: number;
}
/**
 * Sets the function to create slider components
 * @param {ElFunction} f - The function whose returned element is used when the component is created
 */
export declare function setSliderElement(f: ElFunction): void;
/**
 * Class representing a slider setting.
 * @extends BaseSetting
 * @param {Object} o - The slider options
 * @param {number} [o.min=0] - The slider's minimum range
 * @param {number} o.max - The slider's maximum range
 * @param {number} [o.step=1] - The steps the slider takes when being dragged
 * @param {number} o.defaultValue - The slider's default value
 */
export declare class SliderSetting extends BaseSetting {
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
    constructor(o: SliderSettingOpts);
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
export declare function createSettingColumn(main: HTMLDivElement, arr: SettingsUITypes[]): void;
export {};
