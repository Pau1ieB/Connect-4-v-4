import { findUserByFingerprint, addUser, saveUserData } from "../data/users.js";

export const loginVisitor=async (req,res)=>{
    const user = findUserByFingerprint(req.headers.visitorid);
    res.status(200).json({ok:1,data:user});
}

export const registerVisitor=async (req,res)=>{
    const user = addUser(req.body.name,req.headers.visitorid);
    await saveUserData();
    res.status(201).json({ok:1,data:user});
}