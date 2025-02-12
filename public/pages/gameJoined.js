import { openPage } from "./page.js";
import { getUser, removeGame } from "../data/user.js";
import { waitingForTemplate } from "../templates/mainTemplate.js";
import { pause } from "../utils/pause.js";
import { leaveGame } from "../dbFunctions.js";
import { openMainPage } from "./mainPage.js";
import { stopRemoteMessaging } from "../utils/remoteMessage.js";

let block=false;

export const openGameJoinedPage=async ()=>{
    openPage('main',waitingForTemplate(['Game Joined',`Waiting for ${4-getUser().gamePlayers.length} players`],'Leave Game'));
    const elems = [...document.querySelectorAll('*[data-opacity="0"]')];
    block=false;
    elems.at(-1).addEventListener('click',leaveCurrentGame);
    await pause(500);
    elems.forEach(e=>e.dataset.opacity='1');
}

const leaveCurrentGame=async ()=>{
    if(block)return;
    if(!confirm('Do you want to leave the game?'))return;
    block=true;
    const user = getUser();
    const response = await leaveGame(user.gameId);
//    console.log(response);
    if(response.ok==1){
        removeGame();
        stopRemoteMessaging();
        [...document.querySelectorAll('*[data-opacity="1"]')].forEach(e=>e.dataset.opacity='2');
        await pause(1500);
        openMainPage();
    }
}