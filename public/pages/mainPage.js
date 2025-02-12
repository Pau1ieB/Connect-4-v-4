import { openPage} from "./page.js"
import { mainTemplate } from "../templates/mainTemplate.js"; 
import { getUser, addGame, setGamesList } from "../data/user.js";
import { pause } from "../utils/pause.js";
import { hideContent } from "../utils/hideContent.js";
import { createGame, fetchGamesList } from "../dbFunctions.js";
import { openGameCreatedPage } from "./gameCreated.js";
import { openGameLobby } from "./gameLobby.js";
import { showMessage } from "../utils/message.js";
import { startRemoteMessage } from "../utils/remoteMessage.js";

let block=false;

export const openMainPage=async ()=>{
    openPage('main',mainTemplate(getUser().name));
    const elems = [...document.querySelectorAll('*[data-opacity="0"]')];
    elems[2].addEventListener('click',setupGame);
    elems[3].addEventListener('click',setupGameslist);
    await pause(500);
    elems.forEach(e=>e.dataset.opacity='1');
    block=false;
}

const setupGame=async ()=>{
    if(block)return;
    block=true;
    const response = await createGame();
//    console.log(response);
    if(response.ok=='1'){
        addGame(response.data.id,response.data.players,response.data.turn);
        await hideContent();
        startRemoteMessage();
        openGameCreatedPage()
    }
}

const setupGameslist=async ()=>{
    if(block)return;
    block=true;
    const response = await fetchGamesList();
//    console.log(response);
    if(response.ok=='1'){
        if(response.data.length==0){
            showMessage(['There are currently no games to join'],3000);
            block=false;
        }
        else{
            setGamesList(response.data);
            await hideContent();
            startRemoteMessage();
            openGameLobby();
        }
    }
}