import { openPage } from "./page.js";
import { gameTemplate, gridElementCounter } from "../templates/gameTemplates.js";
import { create } from "../utils/create.js";
import { getUser } from "../data/user.js";
import { showMessage } from "../utils/message.js";
import { pause } from "../utils/pause.js";
import { startCountdown, cancelCallback } from "../utils/countdown.js";
import { sendAMove } from "../dbFunctions.js";
import { openMainPage } from "./mainPage.js";
import { stopRemoteMessaging } from "../utils/remoteMessage.js";

const rem = parseInt(getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px',''));
let block=true;

export const openGamePage=async ()=>{
    const user = getUser();
    const players = sortPlayers(user);
    openPage('game',gameTemplate(rem,players,user.gameTurn));
    setActivePlayerBorder(user,[...document.querySelectorAll('td label')]);
    const gridElement = document.querySelector('.grid');
    gridElement.addEventListener('mousedown',gridMouseDown);
    gridElement.addEventListener('mouseover',gridMouseMove);
    gridElement.addEventListener('mouseleave',gridMouseLeave);
    gridElement.addEventListener('mouseup',gridMouseUp);

    gridElement.addEventListener('touchstart',touchStart);
    gridElement.addEventListener('touchmove',touchMove);
    gridElement.addEventListener('touchend',touchEnd);

    block=true;
    showMessage(["The game will start shortly"],5000);
    await pause(5500);
    if(user.gamePlayers[user.gameTurn].id==user.id)startMove();
    else document.querySelector('h2').textContent='Opponents Move';
}

const startMove=()=>{
    block=false;
    startCountdown(10,updateCount,sendMoveSuccess,sendMoveFail);
}

const gridMouseDown=event=>{
    event.preventDefault();
    if(block)return;
    mouseDown(event.target);
}

const gridMouseMove=event=>{
    event.preventDefault();
    if(block)return;
    if(event.target.dataset.id!='box')return;
    const elem = document.querySelector('.counter[data-active="1"]');
    if(!elem)return;
    mouseMove(event.target,elem);
}

const gridMouseLeave=event=>{
    event.preventDefault();
    if(block)return;
    const elem = document.querySelector('.counter[data-active="1"]');
    if(elem)elem.remove();
}

const gridMouseUp=event=>{
    if(block)return;
    mouseUp(event.target);
}

const touchStart=event=>{
    if(event.cancelable) event.preventDefault();
    if(block)return;
    mouseDown(event.targetTouches[0].target);
}

const touchMove=event=>{
    if(event.cancelable) event.preventDefault();
    if(block)return;
    const target = document.elementFromPoint(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
    const elem = document.querySelector('.counter[data-active="1"]');
    if(elem && target.dataset.id=='box')mouseMove(target,elem);
    else if(elem)elem.remove();
}

const touchEnd=event=>{
    if(event.cancelable) event.preventDefault();
    if(block)return;
    const target = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    mouseUp(target);
}

const mouseDown=target=>{
    if(target.dataset.id!='box' || document.querySelector('.counter[data-active="1"]'))return;
    const user = getUser();
    document.querySelector('.grid').firstChild.after(create([gridElementCounter(1,parseInt(target.dataset.col),user.gamePlayers[user.gameTurn].color)]));
}

const mouseMove=(target,elem)=>{
    const col = parseInt(target.dataset.col);
    elem.style.cssText = `--row1:1;--col1:${col};--row2:2;--col2:${col+1};;--x:0;--y:${-10}px`;
}

const mouseUp=async target=>{
    const elem = document.querySelector('.counter[data-active="1"]');
    if(!elem)return;
    if(document.querySelectorAll(`.grid-image[data-col='${target.dataset.col}'][data-filled]`).length==9){
        if(elem)elem.remove();
        return;
    }
    const user = getUser();
    const result = makeMove(target.dataset.col,user.gameTurn);
    if(result){
        cancelCallback({win:true,message:target.dataset.col});
        stopRemoteMessaging();
        await pause(1000);
        showWin(result.row,result.col,result.win[0],result.win[1],user.name);
        endGame(user.name);
    }
    else cancelCallback({win:false,message:target.dataset.col});

}

const updateCount=count=>{
    document.querySelector('h2').textContent=count;
}

const sendMoveSuccess = data=>{
    document.querySelector('h2').textContent='';
    sendMove(data);
}

const sendMoveFail = ()=>{
    document.querySelector('h2').textContent='';
    sendMove({win:false,message:'-1'});
    block=true;
}

const sendMove=async data=>{
    const user = getUser();
    const response = await sendAMove(user.gameId,data);
//    console.log(response);
    (data!='-1')?endTurn():endTurn(false);
}

export const processMove=async move=>{
    const col = parseInt(move);
    if(col>-1){
        const gridElement = document.querySelector('.grid');
        const user = getUser();
        gridElement.firstChild.after(create([gridElementCounter(1,col,user.gamePlayers[user.gameTurn].color)]));
        await pause(2500);
        const result = makeMove(col,user.gameTurn);
        if(result){
            stopRemoteMessaging();
            await pause(1000);
            showWin(result.row,result.col,result.win[0],result.win[1],user.gamePlayers[user.gameTurn].name);
            endGame(user.gamePlayers[user.gameTurn].name);
            return;
        }
        await pause(1100);
    }
    (col>-1)?endTurn():endTurn(false);
}

const endTurn=(incCount=true)=>{
    const user = getUser();
    if(incCount){
        user.gameTurnCount++;
        if(user.gameTurnCount==90){
            endGame('',true);
            return;
        }
    }
    user.gameTurn++;
    user.gameTurn = (user.gameTurn==4)?0:user.gameTurn;
    setActivePlayerBorder(user);
    if(user.gamePlayers[user.gameTurn].id==user.id)startMove();
    else{
        document.querySelector('h2').textContent='Opponents Move';
        block=true;
    }
}

const makeMove=(col,turn)=>{
    const elem = document.querySelector('.counter[data-active="1"]');
    const gridElement = document.querySelector('.grid');
    const list = [...gridElement.querySelectorAll(`.grid-image[data-col='${col}']`)];
    let fillIndex = list.findIndex(e=>e.dataset.filled);
    fillIndex = (fillIndex==-1)?list.length-1:fillIndex-1;
    if(fillIndex>-1){
        list[fillIndex].dataset.filled=turn;
        let row = parseInt(list[fillIndex].dataset.row)-1
        elem.style.cssText = `${list[fillIndex].style.cssText};--delay:${row*0.05}s;--x:0;--y:${(row*-40)-10}px`;
        elem.dataset.row1=list[fillIndex].dataset.row;
        elem.dataset.col1=list[fillIndex].dataset.col;
        elem.dataset.translate='1';
        elem.dataset.active='0';
        row++;
        const col = parseInt(list[fillIndex].dataset.col);
        const win = checkForWin(row,col,turn);
        if(win) return{row,col,win};
    }
    else elem.remove();
    return false;
}

const checkForWin=(row,col,turn)=>{
    if(checkFourInRow(turn,row,col,0,1)) return [0,1];
    if(checkFourInRow(turn,row,col,1,1)) return [1,1];
    if(checkFourInRow(turn,row,col,1,0)) return [1,0];
    if(checkFourInRow(turn,row,col,1,-1)) return [1,-1];
    if(checkFourInRow(turn,row,col,0,-1)) return [0,-1];
    if(checkFourInRow(turn,row,col,-1,-1)) return [-1,-1];
    if(checkFourInRow(turn,row,col,-1,1)) return [-1,1];
    return false;
}

export const checkFourInRow=(turn,row,col,dy,dx)=>{
    let i=0;
    while(i<3){
        row+=dy;
        col+=dx;
        let elem = document.querySelector(`div[data-row="${row}"][data-col="${col}"]`);
        if(!elem || !elem.dataset.filled || elem.dataset.filled!=turn)return false;
        i++;
    }
    return true;
}

const endGame=async (name,draw=false)=>{
    const user = getUser();
    (!draw)?showMessage([`The WINNER is ${name}`],5000):showMessage(['The Game has been Drawn'],5000);
    await pause(15000);
    openMainPage();
}

const sortPlayers=user=>{
    let playerIndex = user.gamePlayers.findIndex(player=>player.id==user.id);
    let count=0;
    const list=[];
    while(count<user.gamePlayers.length){
        list.push(user.gamePlayers[playerIndex]);
        playerIndex = (++playerIndex==user.gamePlayers.length)?0:playerIndex;
        count++;
    }
    return list;
}

const setActivePlayerBorder=(user)=>{
    let elem = document.querySelector('td label[data-active="1"]');
    if(elem)elem.dataset.active='0';
    document.querySelector(`td label[data-id="${user.gamePlayers[user.gameTurn].id}"]`).dataset.active='1';
}

const showWin=(row,col,dy,dx,name)=>{
    document.querySelector('h2').textContent=`Winner: ${name}`;
    let i=0;
    while(i<4){
        const elem =  document.querySelector(`.counter[data-row1="${row}"][data-col1="${col}"]`)
        elem.dataset.active='2';
        row+=dy;
        col+=dx;
        i++;
    }
}