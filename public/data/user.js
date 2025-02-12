const user={
    name:'',
    visitorId:'',
    id:-1,
    gameId:-1,
    gamePlayers:null,
    gameTurn:-1,
    gameTurnCount:-1
}

let gamesList=[];

export const setupUser=(id,name)=>{
    user.id=id;
    user.name=name;
}

export const getUser=()=>user;

export const addGame=(gameId,players,turn)=>{
    user.gameId = gameId;
    user.gamePlayers=players;
    user.gameTurn=turn;
    user.gameTurnCount=0;
}

export const removeGame=()=>{
    user.gameId=-1;
    user.gamePlayers=null;
    user.gameTurn=-1;
}

export const getGamesList=()=>gamesList;

export const setGamesList=list=>gamesList=list;