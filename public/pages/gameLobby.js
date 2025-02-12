import { openPage } from "./page.js";
import { lobbyTemplate } from "../templates/lobbyTemplate.js";
import { getGamesList, getUser, addGame, removeGame } from "../data/user.js";
import { pause } from "../utils/pause.js";
import { hideContent } from "../utils/hideContent.js";
import { joinGame } from "../dbFunctions.js";
import { openGamePage } from "./gamePage.js";
import { openMainPage } from "./mainPage.js";
import { stopRemoteMessaging } from "../utils/remoteMessage.js";
import { openGameJoinedPage } from "./gameJoined.js";

let block=false;

export const openGameLobby=async()=>{
    openPage('lobby',lobbyTemplate(getGamesList()));
    const elems = [...document.querySelectorAll('*[data-opacity="0"]')];
    elems.filter((elem,i)=>i>0).forEach(button=>button.addEventListener('click',selectGameToJoin));
    await pause(500);
    elems.forEach(e=>e.dataset.opacity='1');
    block=false;
}

const selectGameToJoin=async event=>{
    const id = parseInt(event.target.dataset.id);
    const response = await joinGame(id);
    if(response.ok=='1'){
        addGame(response.data.id,response.data.players,response.data.turn);
        await hideContent();
//        openGamePage();
        (response.data.players.length<4)?openGameJoinedPage():openGamePage();
    }
}

export const gameJoined=(player)=>{
    const user = getUser();
    user.gamePlayers.push(JSON.parse(player));
//    openGamePage();
    (user.gamePlayers.length<4)?document.querySelector('main').children[1].textContent = `Waiting for ${4-user.gamePlayers.length} players`:openGamePage();
}

export const gameLeft=id=>{
    id=parseInt(id);
    const user = getUser();
    user.gamePlayers = user.gamePlayers.filter(player=>player.id!=id);
    document.querySelector('main').children[1].textContent = `Waiting for ${4-user.gamePlayers.length} players`;
}

export const gameCancelled=()=>{
    stopRemoteMessaging();
    removeGame();
    openMainPage();
}