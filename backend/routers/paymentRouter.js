import bcrypt from 'bcryptjs';
import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Pay from '../models/paymentModel.js';
import midtransClient from 'midtrans-client';
import { isAuth } from '../utils.js';
import Order from '../models/orderModel.js';
//---------------- WITH CORE API MIDTRANDS--------------------
let coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-NTSTWPftX87GGhn5Llbs9D_z',
    clientKey : 'SB-Mid-client-BIf_Zw8-huXhbVCP'
});



const paymentRouter=express.Router();


paymentRouter.get('/seed',
expressAsyncHandler(async(req, res) => {
    //await User.remove({});
    const createdPayment= await Pay.insertMany(data.pay);
    res.send({createdPayment});
}));

//-----PAYMENT ORDERS----------------------------------------
paymentRouter.post(
    '/orders',
    expressAsyncHandler(async(req,res)=>{
        if(req.body.length===0){
            res.status(400).send({message:'Order is empty'});
        }else{
            
            await coreApi.charge(req.body)
            .then((chargeResponse)=>{
                //console.log('chargeResponse:',JSON.stringify(chargeResponse));
                res.send({
                    bank:"permata",
                    transaction_status:chargeResponse.transaction_status,
                    status:chargeResponse.status_message,
                    payment_type:chargeResponse.payment_type,
                    transaction_id:chargeResponse.transaction_id,
                    order_id:chargeResponse.order_id,
                    transaction_time:chargeResponse.transaction_time,
                    Va:chargeResponse.permata_va_number,
                    merchant_id:chargeResponse.merchant_id,
                    
                })
                
                return;
            })
            .catch((e)=>{
                console.log('Error occured:',e.message);
            });;
        
        }
    })
)
paymentRouter.put(
    '/orders/:id/pay',
    isAuth,
    expressAsyncHandler(async(req,res)=>{
        const order=await Order.findById(req.params.id);
        //console.log(req.body.paymentInfo);
        if(order){
            order.paymentInfo=req.body.paymentInfo;
            //order.paymentInfo={
              //  bank:'permata',
            //}
            const updateOrder=await order.save();
            res.send({message:'Order Paid',order:updateOrder});
        }else{
            res.status(404).send({message:'Order Not Found'});
        }
    })
)
//------PAYMENT NOTIFICATIONS--------------------------------------
paymentRouter.post(
    '/notification',
    expressAsyncHandler(async(req,res)=>{
        if(req.body.length===0){
            res.status(400).send({message:'Notification is empty'});
        }else{    
            coreApi.transaction.notification(req.body)
            .then((statusResponse)=>{
                let orderId = statusResponse.order_id;
                let transactionStatus = statusResponse.transaction_status;
                let fraudStatus = statusResponse.fraud_status;

                console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

                // Sample transactionStatus handling logic

                if (transactionStatus == 'capture'){
                    // capture only applies to card transaction, which you need to check for the fraudStatus
                    if (fraudStatus == 'challenge'){
                        // TODO set transaction status on your databaase to 'challenge'
                    } else if (fraudStatus == 'accept'){
                        // TODO set transaction status on your databaase to 'success'
                    }
                } else if (transactionStatus == 'settlement'){
                    // TODO set transaction status on your databaase to 'success'
                } else if (transactionStatus == 'deny'){
                    // TODO you can ignore 'deny', because most of the time it allows payment retries
                    // and later can become success
                } else if (transactionStatus == 'cancel' ||
                transactionStatus == 'expire'){
                    // TODO set transaction status on your databaase to 'failure'
                } else if (transactionStatus == 'pending'){
                    // TODO set transaction status on your databaase to 'pending' / waiting payment
                }
            });
        } 
    })
)   

//------PAYMENT STATUS---------------------------------------------
paymentRouter.get(
    '/status/:order_id',
    expressAsyncHandler(async(req,res)=>{
        if(req.params.order_id.length===0){
            
            console.log('parameter kosong',req.params.order_id);
        }else{
            
            console.log('parameter',req.params.order_id);
            coreApi.transaction.status(req.params.order_id)
            .then((response)=>{
                console.log('response:',JSON.stringify(response));
                res.send({
                    _id:response.order_id,
                    bank:response.bank,
                    status_code:response.status_code,
                    transaction_status:response.transaction_status,
                    fraud_status:response.fraud_status,
                    
                })
                return;
            })
            .catch((e)=>{
                console.log('Error occured:',e.message);
            });;
        
    }})
)

export default paymentRouter;