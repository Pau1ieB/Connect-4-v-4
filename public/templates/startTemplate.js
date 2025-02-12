export const startTemplate=dataList=>[
    {
        type:'div',
        data:{opacity:'01'},
        style:'--delay:1s',
        content:dataList.map(data=>createDot(data.r,data.c,data.x,data.y))
    }
]
    

const createDot=(r,c,x,y)=>{
    x = (!x)?'0':x;
    y = (!y)?'0':y;
    return{
        type:'div',
        classes:['circle'],
        data:{opacity:'0'},
        style:`grid-area:${r}/${c}/${r+1}/${c+1};--x:${x};--y:${y};--delay:3s`
    }
}