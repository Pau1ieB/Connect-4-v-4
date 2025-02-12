export const loginTemplate=()=>[
    {
        type:'p',
        data:{fontsize:'large',opacity:'0'},
        style:'--delay:0s',
        text:'Please supply a user name'
    },
    {
        type:'div',

        content:[
            {
                type:'input',
                data:{opacity:'0'},
                style:'--delay:0.5s',
                attr:{type:'text',placeholder:'Name', required:true, pattern:'^[a-zA-Z]{3,15}$'},
            },
            {
                type:'button',
                data:{opacity:'0'},
                style:'--delay:0.8s',
                text:'\u25b6'
            }
        ]
    }

]