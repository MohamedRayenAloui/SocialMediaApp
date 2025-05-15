import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRouter from "./routes/user.js";
import postsRoutes from './routes/posts.js';


const app = express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postsRoutes);
app.use("/user", userRouter);


const CONNECTION_URL= 'mongodb+srv://ahmedbna709:Ahmedbenayed94@clustermern.3voh5ni.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`server running on port : ${PORT}`)))
.catch((error)=>console.log(error.message));