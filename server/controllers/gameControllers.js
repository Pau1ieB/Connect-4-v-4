import { createNewGame, findGame, removeGame, getAllGames, fetchGamesToJoin, newGameUser } from "../data/games.js";
import { sendMessages } from "./messageControllers.js";

export const fetchGameList=(req,res)=>{
    const games = fetchGamesToJoin();
    res.status(200).json({ok:1,data:games})
}

export const createGame=(req,res)=>{
    const game = createNewGame(req.user);
    res.status(201).json({ok:1,data:{id:game.id,players:game.players,turn:game.turn}})
}

export const joinGame=(req,res)=>{
    const game = req.game;
    const player = newGameUser(req.user,game);
    sendMessages({action:'joined',message:JSON.stringify(player)},game.players.map(player=>player.id));
    game.players.push(player);
    if(game.players.length==4)game.active=2;
    res.status(200).json({ok:1,data:{id:game.id,players:game.players,turn:game.turn}})
}

export const sendMove=(req,res)=>{
    const user = req.user;
    const game = req.game;
    if(!game.players.find(player=>player.id==user.id)){
        res.status(403).json({ok:0,data:'You are not authorised for game access'});
        return;
    }
    const move = req.body.move;
    sendMessages({action:'move',message:move.message},findGame(game.id).players.filter(player=>player.id!=user.id).map(player=>player.id));
    if(move.win)removeGame(game.id);
    if(move.win)console.log(getAllGames());
    res.status(201).json({ok:1});
}

export const cancelGame=(req,res)=>{
    const user = req.user;
    const game = req.game;
    sendMessages({action:'cancelled'},findGame(game.id).players.filter(player=>player.id!=user.id).map(player=>player.id));
    removeGame(game.id);
    res.status(200).json({ok:1,data:`game cancelled: ${game.id}`})
}

export const leaveGame = (req,res)=>{
    const user = req.user;
    const game = req.game;
    game.players = game.players.filter(player=>player.id!=user.id);
    sendMessages({action:'leave',message:user.id},game.players.map(player=>player.id));
    res.status(200).json({ok:1});
}