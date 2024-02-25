import {setToggleElement, ToggleSetting, createSettingColumn, SliderSetting, setSliderElement} from "../index";

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

setToggleElement((o: ToggleSetting, btn: HTMLElement) => {
  btn.innerText = o.name;
  
  const text = $$("p", {text: o.isToggled ? "On" : "Off"});
  
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

setSliderElement((o: SliderSetting, sl: HTMLElement) => {
  const slider = sl as HTMLInputElement;
  const text = $$("p", {text: o.defaultValue.toString()});
  
  const el = $$("div", {
    attrs: {class: "slider"},
    children: [slider, text],
  });
  
  slider.addEventListener("input", () => text.textContent = slider.value);
  
  slider.addEventListener("change", () => {
    // change settings
  });
  
  return el;
});

createSettingColumn($("#container"), [
  new ToggleSetting({
    name: "Don't press",
    id: "dont-press",
  }),
  new SliderSetting({
    name: "Music!!",
    id: "music",
    max: 100,
    defaultValue: 50,
  }),
]);