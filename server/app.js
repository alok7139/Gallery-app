import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { dbconnection } from './database/dbconnection.js'


const app = express();
configDotenv({path: './.env'})
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET" , "DELETE" , "PATCH" , "PUT" , "POST"],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/"
}))

dbconnection();

export default app;
