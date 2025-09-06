import express from 'express';
import 'dotenv/config';
import connectDB from './configs/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import teacherRouter from './routes/teacherRoutes.js';

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res)=> {
    res.send("Server is running");
})

app.use('/api/user', userRouter);
app.use('/api/teacher', teacherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})