const fragment = document.createDocumentFragment();

export const create=(content,parent)=>{
    const host = (parent)?parent:fragment;
    for(const data of content){
        const elem = createElement(data);
        host.append(elem);
        if(data.content)create(data.content,elem);
    }
    if(!parent)return host;
}

const createElement=data=>{
    if(data.textNode)return document.createTextNode(data.text);
    let elem = document.createElement(data.type);
    if(data.classes)for(const c of data.classes)elem.classList.add(c);
    if(data.attr)for(const attr of Object.entries(data.attr))elem.setAttribute(attr[0],attr[1]);
    if(data.data)for(const d of Object.entries(data.data))elem.dataset[d[0]]=d[1];
    if(data.style) elem.style.cssText=data.style;
    if(data.text)elem.textContent=data.text;
    return elem;
}