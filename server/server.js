import express from 'express';
import cors from 'cors';
import env from './config/dotenv.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupUserData } from '../tmp/users.js';

import authRouter from './routes/authRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import messageRouter from './routes/messageRoutes.js';

await setupUserData();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api/auth/',authRouter);
app.use('/api/game/',gameRouter);
app.use('/api/message/',messageRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'../public')));

app.set('views','views');
app.set('view engine','ejs');

app.get('/',(req,res)=>{res.render('index');})

app.listen(env.PORT,()=>console.log(`Server is now listening on port: ${env.PORT}`))