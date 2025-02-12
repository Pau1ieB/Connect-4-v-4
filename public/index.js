import { setupFingerprint, validateVisitor } from "./utils/fingerprintModule.js";
import { openLoginPage } from "./pages/loginPage.js";
import { openMainPage } from "./pages/mainPage.js";
import { loginVisitor } from "./dbFunctions.js";
import { getUser } from "./data/user.js";
import { openStartPage, showStartPage, hideStartPage } from "./pages/startPage.js";

openStartPage();

const user = getUser();
const setupSuccess = await setupFingerprint();
if(setupSuccess){
    const visitor = await validateVisitor();
    user.visitorId = visitor.visitorId;
    const response = await loginVisitor();
    if(response.ok==1 && response.data){
        user.id = response.data.id;
        user.name = response.data.name;
    }
}

await showStartPage();

await hideStartPage();

(user.id>-1)?openMainPage():openLoginPage();