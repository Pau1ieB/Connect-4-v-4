import { openPage } from "./page.js";
import { startTemplate } from '../templates/startTemplate.js';
import { dataC_1 } from '../data/startPageData/dataC_1.js';
import { dataO } from '../data/startPageData/dataO.js';
import { dataN_1 } from '../data/startPageData/dataN_1.js';
import { dataN_2 }  from '../data/startPageData/dataN_2.js';
import { dataE } from '../data/startPageData/dataE.js';
import { dataC_2 } from "../data/startPageData/dataC_2.js";
import { dataT } from '../data/startPageData/dataT.js';
import { data4_1 } from '../data/startPageData/data4_1.js';
import { dataX } from '../data/startPageData/dataX.js';
import { data4_2 } from '../data/startPageData/data4_2.js';
import { pause } from "../utils/pause.js";
import { selectStartPageElement } from "../utils/activateStartPage.js";

export const openStartPage=()=> openPage('start',startTemplate([...dataC_1,...dataO,...dataN_1,...dataN_2,...dataE,...dataC_2,...dataT,...data4_1,...data4_2,...dataX]));

export const showStartPage=async ()=>{
    let cont = true;
    while(cont){
        cont = selectStartPageElement();
        await pause(25);
    }
    await pause(6000);
}

export const hideStartPage=async ()=>{
    document.querySelector('main > div').dataset.opacity='2';
    await pause(3000);
}