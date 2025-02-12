import { findUserByFingerprint, addUser, saveUserData, fetchUsers } from "../../tmp/users.js";

export const loginVisitor=async (req,res)=>{
    console.log(fetchUsers())
    console.log(req.headers.visitorid)
    const user = findUserByFingerprint(req.headers.visitorid);
    res.status(200).json({ok:1,data:user});
}

export const registerVisitor=async (req,res)=>{
    const user = addUser(req.body.name,req.headers.visitorid);
//    await saveUserData();
    res.status(201).json({ok:1,data:user});
}

export const getAllUsers=(req,res)=>{
    const users = fetchUsers();
    res.status(201).json({ok:1,data:users});
}