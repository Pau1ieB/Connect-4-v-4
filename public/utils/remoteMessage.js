import { getMessages } from "../dbFunctions.js";
import { gameJoined, gameCancelled, gameLeft } from "../pages/gameLobby.js";
import { processMove } from "../pages/gamePage.js";

let activeRemoteMessaging=false;
let remoteMessagingRef=-1;

export const startRemoteMessage=async ()=>{
    if(activeRemoteMessaging)return;
    remoteMessagingRef=setInterval(getRemoteMessage,5000)
    activeRemoteMessaging=true;
}

const getRemoteMessage = async ()=>{
    const response = await getMessages();
//    console.log(response);
    if(response.ok){
        response.data.forEach(message=>{
            if(message.action=='joined')gameJoined(message.message);
            else if(message.action=='cancelled')gameCancelled(message);
            else if(message.action=='leave')gameLeft(message.message);
            else if(message.action=='move')processMove(message.message);
        })
    }
}

export const stopRemoteMessaging=()=>{
    if(!activeRemoteMessaging)return;
    clearInterval(remoteMessagingRef);
    remoteMessagingRef=-1;
    activeRemoteMessaging=false;
}