export const lobbyTemplate=list=>[
    {
        type:'p',
        data:{fontsize:'large',opacity:'0'},
        style:'--delay:0s',
        text:'Select Game To Join'
    },
    ...list.map((game,i)=>createButton(game,(i*0.3)+0.5))
]

const createButton=(game,delay)=>{
    return{
        type:'button',
        data:{id:game.id,opacity:'0'},
        style:`--delay:${delay}s`,
        text:game.host
    }
}