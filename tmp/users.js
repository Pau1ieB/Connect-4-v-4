import fs from 'fs/promises';
let users=[];
let userCount=0;

export const setupUserData=async ()=>{
    try{
        const file = await fs.readFile('./tmp/usersData','utf8');
        users = JSON.parse(file);
        userCount = users.reduce((count,users)=>(count>users.id)?count:users.id,-1)+1;
    }catch(err){
        await fs.writeFile(`./tmp/usersData`, JSON.stringify([]));
    }
}

export const addUser=(name,visitorId)=>{
    users.push({
        id:userCount++,
        name,
        visitorId,
        messages:[]
    });
    return users.at(-1);
}

export const fetchUser=id=>users.find(user=>user.id==id);

export const findUserByFingerprint=visitorId=>{
    const user = users.find(user=>user.visitorId==visitorId);
    return user;
}

export const saveUserData=async ()=>{
    await fs.writeFile(`./tmp/usersData`, JSON.stringify(users));
}