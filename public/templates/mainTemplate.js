export const mainTemplate=name=>[
    createPara(`Welome ${name}`, 'large', 0),
    createPara('What would you like to do?', 'medium', 0.3),
    {
        type:'button',
        data:{opacity:'0'},
        style:'--delay:0.8s',
        text:'Create Game'
    },
    {
        type:'button',
        data:{opacity:'0'},
        style:'--delay:1.1s',
        text:'Join Game'
    }
]

export const waitingForTemplate=(messages,buttonText)=>[
    ...messages.map((message,i)=>createPara(message,'large',i*0.3)),
    {
        type:'button',
        data:{opacity:'0'},
        style:'--delay:0.8s',
        text:buttonText
    }
]

const createPara=(message,fontsize,delay)=>{
    return {
        type:'p',
        data:{fontsize,opacity:'0'},
        style:`--delay:${delay}s`,
        text:message
    }
}

// {
//     type:'p',
//     data:{fontsize:'large',opacity:'0'},
//     style:'--delay:0s',
//     text:`Welome ${name}`
// },
// {
//     type:'p',
//     data:{fontsize:'medium',opacity:'0'},
//     style:'--delay:0.3s',
//     text:'What would you like to do?'
// }