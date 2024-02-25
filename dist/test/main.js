"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
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
(0, index_1.setToggleElement)((o, btn) => {
    btn.innerText = o.name;
    const text = $$("p", { text: o.isToggled ? "On" : "Off" });
    const el = $$("div", {
        attrs: {
            id: o.id,
            class: "btn",
        },
        children: [btn, text],
    });
    btn.addEventListener("pointerup", () => {
        text.textContent = o.isToggled ? "On" : "Off";
    });
    return el;
});
(0, index_1.setSliderElement)((o, sl) => {
    const slider = sl;
    const text = $$("p", { text: o.defaultValue.toString() });
    const el = $$("div", {
        attrs: { class: "slider" },
        children: [slider, text],
    });
    slider.addEventListener("input", () => text.textContent = slider.value);
    slider.addEventListener("change", () => {
        // change settings
    });
    return el;
});
(0, index_1.createSettingColumn)($("#container"), [
    new index_1.ToggleSetting({
        name: "Don't press",
        id: "dont-press",
    }),
    new index_1.SliderSetting({
        name: "Music!!",
        id: "music",
        max: 100,
        defaultValue: 50,
    }),
]);
