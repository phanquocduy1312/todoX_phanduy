import express from 'express';
import router from './routes/taskRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config()
import { connectDB } from './config/db.js';
import path from 'path'
const __dirname=path.resolve();
const app=express();
// middlewares
app.use(express.json())
if(process.env.NODE_ENV!=='production'){
app.use(cors({origin:'http://localhost:5173'}))
}

app.use('/api/tasks',router);
if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))

})
}
connectDB().then(()=>{
app.listen(process.env.PORT,()=>{
    console.log('server port:5001 is running');
    
})

});
