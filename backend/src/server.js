import express from 'express';
import router from './routes/taskRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config()
import { connectDB } from './config/db.js';

const app=express();
// middlewares
app.use(express.json())
app.use(cors({origin:'http://localhost:5173'}))
app.use('/api/tasks',router);
connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
    console.log('server port:5001 is running');
    
})

});
