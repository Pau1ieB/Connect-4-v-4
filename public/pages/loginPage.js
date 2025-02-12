import { openPage } from './page.js';
import { loginTemplate } from '../templates/loginTemplate.js';
import { openMainPage } from './mainPage.js';
import { pause } from '../utils/pause.js'
import { showMessage, clearMessage } from '../utils/message.js';
import { registerUser } from '../dbFunctions.js';
import { setupUser } from '../data/user.js';

let disableLogin=true;

export const openLoginPage=async ()=>{
    openPage('login',loginTemplate());
    const elems = [...document.querySelectorAll('*[data-opacity="0"]')];
    elems[2].addEventListener('click',loginVisitor)
    await pause(500);
    elems.forEach(e=>e.dataset.opacity='1');
    disableLogin=false;
}

const loginVisitor=async ()=>{
    if(disableLogin)return;
    const input = document.querySelector('main input');
    if(input.validity.valueMissing || input.validity.patternMismatch) return showMessage(['You need to provide a name between 3 and 15 chars in length and only use alphabetical characters'],5000);
    disableLogin=true;
    showMessage(['Logging in'],-1);
    await pause(2000);
    const response = await registerUser(input.value);
    console.log(response);
    setupUser(response.data.id,response.data.name);
    await clearMessage();
    const elems = [...document.querySelectorAll('*[data-opacity="1"]')];
    elems.forEach(e=>e.dataset.opacity='2');
    await pause(1500);
    openMainPage();
}