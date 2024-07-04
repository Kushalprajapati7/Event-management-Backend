import express, { Request, Response } from "express";
import connectDB from "./config/database";
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import eventRoutes from './routes/eventRoutes'

dotenv.config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true , limit:"500mb"}));
app.use(cors())

app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);

connectDB().then(() => {

    app.listen(port, () => {
        console.log(`Server is On At Port 3000`);

    })
}).catch((error: any) => {
    console.log("Error starting server :", error.message);
});