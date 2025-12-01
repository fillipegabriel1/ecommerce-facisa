import express from 'express';
import  dotenv from 'dotenv';
import userRouter from './src/routers/user-router.js';
import productRouter from './src/routers/product-router.js';
import mongoose from 'mongoose';
import authMiddleware from './src/auth-Middleware.js'
import cors from 'cors';
dotenv.config();

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

app.use(express.json()); 
app.use(cors(
    {origin: 'http://localhost:5173'}
));
app.use(authMiddleware);

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
