import Router from 'express';
import { fetchGameList, createGame, joinGame, sendMove, leaveGame, cancelGame } from '../controllers/gameControllers.js';
import { findUser } from '../middleware/getUser.js';
import { findAGame } from '../middleware/getGame.js';

const router = Router();

router.get('/fetch',findUser,fetchGameList)

router.post('/create',findUser,createGame)

router.post('/join',findUser,findAGame,joinGame)

router.post('/move',findUser,findAGame,sendMove)

router.patch('/leave',findUser,findAGame,leaveGame)

router.delete('/cancel/:gameId',findUser,findAGame,cancelGame)

export default router;