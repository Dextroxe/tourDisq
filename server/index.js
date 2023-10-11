import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './route/userRoute.js';
import { residencyRoute } from './route/residencyRoute.js';
import dotenv from 'dotenv';
dotenv.config()



const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, ()=> {
    console.log(`Server: ${PORT}`)
});
 
app.use('/api/user',userRoute)
app.use('/api/residency',residencyRoute) 