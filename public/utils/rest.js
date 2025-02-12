import { getUser } from "../data/user.js";

// export const get=async(path,data)=>{
//     try{
//         let response = await fetch(path,data);
//         response = await response.json();
//         return response;
//     }catch(err){
//         if(err.name == 'NetworkError' || err == 'TypeError: NetworkError when attempting to fetch resource.'){
//             console.log('There was a network error...');
//         };
//         return err;
//     }
// }

export const get=async(path)=>{
    const user = getUser();
    try{
        let response = await fetch(path,{
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id':user.id,
            'visitorId':user.visitorId
            },            
        });
        response = await response.json();
        return response;
    }catch(err){
        if(err.name == 'NetworkError' || err == 'TypeError: NetworkError when attempting to fetch resource.'){
            console.log('There was a network error...');
        };
        return err;
    }
}

export const post=async(path,data)=>{
    const user = getUser();
    try{
        let response = await fetch(path, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id':user.id,
            'visitorid':user.visitorId
            },
            body: JSON.stringify(data)
        });
        response = await response.json();
        return response;
    }catch(err){
        if(err.name == 'NetworkError' || err == 'TypeError: NetworkError when attempting to fetch resource.'){
            console.log('There was a network error...');
        };
        return err;
    }
}

export const put=async(path,data)=>{
    const user = getUser();
    let response = await fetch(path, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'id':user.id,
          'visitorId':user.visitorId
        },
        body: JSON.stringify(data)
    });
    response = await response.json();
    return response;
}

export const patch=async(path,data)=>{
    const user = getUser();
    let response = await fetch(path, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'id':user.id,
          'visitorId':user.visitorId
        },
        body: JSON.stringify(data)
    });
    response = await response.json();
    return response;
}

export const del=async(path)=>{
    const user = getUser();
    let response = await fetch(path, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'id':user.id,
          'visitorId':user.visitorId
        }
    });
    response = await response.json();
    return response;
}