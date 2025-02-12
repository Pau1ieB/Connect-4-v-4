import { create } from '../utils/create.js';

export const openPage=(page,template)=>{
    const main = document.querySelector('main');
    main.dataset.page=page;
    main.replaceChildren(create(template));
}

export const updatePage=template=>document.querySelector('main').replaceChildren(create(template));