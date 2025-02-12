import { updatePage } from "./page.js";
import { waitingForTemplate } from "../templates/mainTemplate.js";
import { pause } from "../utils/pause.js";
import { cancelGame } from "../dbFunctions.js";
import { openMainPage } from "./mainPage.js";
import { getUser } from "../data/user.js";
import { stopRemoteMessaging } from "../utils/remoteMessage.js";

export const openGameCreatedPage=async ()=>{
    updatePage(waitingForTemplate(['Game Created','Waiting for 3 players'],'Cancel Game'));
    const elems = [...document.querySelectorAll('*[data-opacity="0"]')];
    elems.at(-1).addEventListener('click',cancelSingleGame);
    await pause(500);
    elems.forEach(e=>e.dataset.opacity='1');
}

const cancelSingleGame=async ()=>{
    if(!confirm('Do you want to Cancel this Game?'))return;
    const user = getUser();
    const response = await cancelGame(user.gameId);
//    console.log(response);
    stopRemoteMessaging();
    [...document.querySelectorAll('*[data-opacity="1"]')].forEach(e=>e.dataset.opacity='2');
    await pause(1500);
    openMainPage();
}