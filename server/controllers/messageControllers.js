import { fetchUser } from "../data/users.js";

export const getMessages=(req,res)=>{
    const user = req.user;
    const messages = user.messages;
    user.messages=[];
    res.status(200).json({ok:1,data:messages});
}

export const sendMessages=(message,users)=>users.forEach(id=>fetchUser(id).messages.push(message))