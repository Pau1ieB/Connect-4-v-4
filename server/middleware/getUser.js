import { fetchUser } from "../../tmp/users.js";

export const findUser=(req,res,next)=>{
    let id = parseInt(req.headers.id);
    if(isNaN(id)){
        res.status(403).json({ok:0,data:'You are not authorised for access'});
        return;
    }
    const user = fetchUser(id);
    if(!user || user.visitorId!=req.headers.visitorid){
        res.status(403).json({ok:0,data:'You are not authorised for access'});
        return;
    }
    req.user=user;
    next();
}