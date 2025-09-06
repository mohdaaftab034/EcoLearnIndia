import express from 'express';
import 'dotenv/config';
import connectDB from './configs/db.js';
import cors from 'cors'

const app = express();

await connectDB();

app.use(express.json());
app.use(cors());


app.get('/', (req, res)=> {
    res.send("Server is running");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})