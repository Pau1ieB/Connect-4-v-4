import { random } from './random.js';

export const selectStartPageElement=()=>{
    const elems = document.querySelectorAll('.circle[data-opacity="0"]');
    if(elems.length==0)return false;
    const index = random(elems.length);
    let count = updateNext(elems,index,0);
    if(count<4)updatePrevious(elems,index-1,count)
    return true;
}

const updateNext=(elems,index,count)=>{
    if(count==4 || index>=elems.length || index<0)return count;
    elems[index].dataset.opacity='1';
    count = updateNext(elems,index+1,count+1);
    return count;
}

const updatePrevious=(elems,index,count)=>{
    if(count==4 || index>=elems.length || index<0)return count;
    elems[index].dataset.opacity='1';
    count = updateNext(elems,index-1,count+1);
    return count;
}