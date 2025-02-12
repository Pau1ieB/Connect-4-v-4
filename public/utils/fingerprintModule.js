let fp;
let visitor;

export const setupFingerprint=async()=>{
    try{
        const FingerprintJS = await import('https://fpjscdn.net/v3/E5mOqU1V6wjbMjfqDN4C');
        fp = await FingerprintJS.load({region: "eu"});
        return true;        
    }catch(err){
        console.error(err);
        return false;
    }
}

export const validateVisitor=async ()=>{
    const result = await fp.get();
    visitor = await result;
    return visitor;
}

export const getVisitor=()=>visitor;