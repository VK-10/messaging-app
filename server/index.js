import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST','PATCH','DELETE'],
    credentials: true,
}))

app.use('/uploads', express.static('uploads/profiles'));
// app.use("/uploads", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);







const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose
    .connect(databaseURL) // Corrected variable name
    .then(() => console.log('Database connection successful')) // Corrected typo in the log message
    .catch((err) => {
        console.error('An error occurred:', err); // Log the actual error object
    });
