export const messageTemplate=messages=>messages.map(message=>{
    return{
        type:'h3',
        text:message
    }
});