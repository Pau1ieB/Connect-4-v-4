export const gameTemplate=(rem,players,turn)=>{
    const canvasLength = rem*40;
    const gridElements=[];
    const gridClasses=['grid-image','grid-box'];
    for(let row=2; row<11; row++) for(let col=1; col<11; col++)gridElements.push(gridElementBox(row,col,gridClasses));
    return[
        {
            type:'div',
            classes:['main-container'],
            content:[
                {
                    type:'div',
                    classes:['container'],
                    content:[
                        {
                            type:'h2',
                            text:''
                        }
                    ]
                },
                {
                    type:'div',
                    classes:['container'],
                    content:[
                        {
                            type:'table',
                            content:[
                                {
                                    type:'tr',
                                    content:addPlayers(players,0,1)
                                },
                                {
                                    type:'tr',
                                    content:addPlayers(players,2,3)
                                }
                            ]
                        }
                    ]
                },
                {
                    type:'div',
                    classes:['container'],
                    content:[
                        {
                            type:'div',
                            classes:['grid'],
                            content:[
                                gridElementBlock(2,1,-1,-1,["bg-white",'grid-block']),
                                ...gridElements
                            ]
                        }                        
                    ]
                }
            ]
        },
    ]
}

const addPlayers=(players,i1,i2)=>[
    addSinglePlayer(players[i1].id,players[i1].name,players[i1].color),
    addSinglePlayer(players[i2].id,players[i2].name,players[i2].color)
]
const addSinglePlayer=(id,name,color,active=0)=>{
    return{
        type:'td',
        content:[
            {
                type:'label',
                data:{id,active,color},
                text:name
            }
        ]   
    }
}

const gridElementBlock=(row,col,row2,col2,classes)=>gridElement(row,col,row2,col2,{row,col},classes);

const gridElementBox=(row,col,classes)=>gridElement(row,col,row+1,col+1,{row,col,id:'box'},classes);

export const gridElementCounter=(row,col,color)=>{
    const template = gridElement(row,col,row+1,col+1,{row,col,translate:'0',active:'1',bgcolor:color},['counter','grid-box']);
    template.style+=`;--x:0;--y:${-10}px`;
    return template;
}

const gridElement=(row,col,row2,col2,data,classes)=>{
    return{
        type:'div',
        classes,
        data,
        style:`--row1:${row};--col1:${col};--row2:${row2};--col2:${col2}`
    }
}