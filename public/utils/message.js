import { messageTemplate } from "../templates/messageTemplate.js";
import { create } from './create.js';
import { pause } from './pause.js';

let cancelRef=-1;

export const showMessage=(messages,delay=3000)=>{
    const parent = document.querySelector('#message-div');
    const overlay = document.querySelector('#overlay');
    if(cancelRef==-1)setupMessage(messages,parent,overlay,delay);
}

export const clearMessage=async ()=>await hideMessage(document.querySelector('#message-div'),document.querySelector('#overlay'));

const setupMessage=(messages,parent,overlay,delay,display=true)=>{
    parent.replaceChildren(create(messageTemplate(messages)));
    if(display)displayMessage(parent,overlay);
    if(delay>-1){
        cancelRef=setTimeout(()=>{
            hideMessage(parent,overlay);
            cancelRef=-1;
        }, delay)
    }
}

const displayMessage=async (parent,overlay)=>{
    parent.dataset.hidden='0';
    overlay.dataset.hidden='0';
    await pause(100);
    parent.dataset.pos='1';
}

const hideMessage=async (parent,overlay)=>{
    parent.dataset.pos='2';
    await pause(100);
    parent.dataset.hidden='1';
    overlay.dataset.hidden='1';
}


const pauseAndDisplayMessage=(message,elem)=>{
    clearTimeout(cancelRef);
    cancelRef=-1;
    elem.dataset.hidden='1';
    setTimeout(()=>displayMessage(message,elem),500);
}