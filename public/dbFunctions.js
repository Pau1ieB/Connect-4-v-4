import { get, post, patch, del } from './utils/rest.js';

export const loginVisitor = async ()=>{
    const response = await get(`/api/auth/loginVisitor`);
    return response;
}

export const registerUser = async name=>{
    const response = await post('/api/auth/registerVisitor',{name});
    return response;
}

export const createGame = async ()=>{
    const response = await post('/api/game/create',{});
    return response;
}

export const joinGame = async gameId=>{
    const response = await post('/api/game/join',{gameId});
    return response;
}

export const cancelGame = async gameId=>{
    const response = await del(`/api/game/cancel/${gameId}`);
    return response;
}

export const leaveGame = async gameId=>{
    const response = await patch('/api/game/leave',{gameId});
    return response;
}

export const fetchGamesList = async ()=>{
    const response = await get(`/api/game/fetch/`);
    return response;
}

export const sendAMove=async (gameId,move)=>{
    const response = await post('/api/game/move',{gameId,move});
    return response;
}

export const getMessages=async ()=>{
    const response = await get(`/api/message`);
    return response;
}

export const sendMessages=async (id,data)=>{
    const response = await patch('/api/message',{id,data});
    return response;
}