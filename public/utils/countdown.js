let count;
let cancelRef=-1;
let callbackCounter;
let callbackSuccess;
let callbackFail

export const startCountdown=(initial,counter,success,fail)=>{
    count=initial;
    callbackCounter=counter;
    callbackSuccess=success;
    callbackFail=fail;
    callbackCounter(count);
    cancelRef = setInterval(countdown,1000);
}

export const cancelCallback=data=>{
    clearInterval(cancelRef);
    callbackSuccess(data);
}

const countdown=()=>{
    count--;
    if(count==0){
        clearInterval(cancelRef);
        callbackFail();
    }
    else callbackCounter(count);
}