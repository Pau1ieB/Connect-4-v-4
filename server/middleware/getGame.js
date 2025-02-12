import { findGame } from "../../tmp/games.js";

export const findAGame=(req,res,next)=>{
    if(!req.user){
        res.send(403).json({ok:0,data:'You are not authorised for access'});
        return;
    }
    let id = parseInt(req.body.gameId);
    if(isNaN(id)) id = parseInt(req.params.gameId);
    if(isNaN(id)){
        res.status(403).json({ok:0,data:'This game doesn\'t exist'});
        return;
    }
    const game = findGame(id);
    if(!game){
        res.status(403).json({ok:0,data:'This game doesn\'t exist'});
        return;
    }
    req.game=game;
    next();
}