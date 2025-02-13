import { random } from "../utils/random.js";

let gamesList=[];

let gameCount=0;

export const createNewGame=user=>{
    const game = {
        id:gameCount++,
        host:user.name,
        players:[],
        turn:random(4),
        colors:['red','green','blue','grey'],
        active:1
    }
    game.players.push(newGameUser(user,game));
    gamesList.push(game);
    return game;
}

export const newGameUser=(user,game)=>{return {id:user.id,name:user.name,color:selectPlayerColor(game)};}

export const removeGame=id=>gamesList = gamesList.filter(game=>game.id!=id);

export const findGame=id=>gamesList.find(game=>game.id==id);

export const getAllGames=()=>gamesList;

export const fetchGamesToJoin=()=>gamesList.filter(game=>game.active==1).map(game=>{return{id:game.id,host:game.host}})

export const selectPlayerColor=game=>{
    const colIndex = random(game.colors.length);
    const col = game.colors[colIndex];
    game.colors.splice(colIndex,1);
    return col;
}