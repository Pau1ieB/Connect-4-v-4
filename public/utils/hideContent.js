import { pause } from "./pause.js";

export const hideContent=async ()=>{
    [...document.querySelectorAll('*[data-opacity="1"]')].forEach(e=>e.dataset.opacity='2');
    await pause(2000);
}