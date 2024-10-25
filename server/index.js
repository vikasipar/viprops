import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

// db connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB!");
    }).catch((err) => {
        console.log("MongoDb connection failed: ", err);
    });

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


// routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);