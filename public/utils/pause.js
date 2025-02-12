export const pause=async pause=>{
    await new Promise((res,rej)=>{
        setTimeout(()=>res(),pause);
    })
}