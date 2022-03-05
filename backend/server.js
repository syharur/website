import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import paymentRouter from './routers/paymentRouter.js';

dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/website-app');


app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.use('/api/payment',paymentRouter);

app.get('/api/config/paypal',(req,res) =>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/',(req,res)=>{
    res.send('Server is ready') 
})
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`);
})