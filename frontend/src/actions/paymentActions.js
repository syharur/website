import axios from 'axios';

import { PAYDETAILS_FAIL, PAYDETAILS_REQUEST, PAYDETAILS_SUCCESS, PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS } from '../constants/paymentConstan.js';


export const paymentDescription=(payment_type,{transaction_details},{bank_transfer})=>async(dispatch)=>{
    try{
        console.log(payment_type,{transaction_details},{bank_transfer});
        dispatch({type:PAYMENT_REQUEST,payload:payment_type,transaction_details,bank_transfer});
      
        try{
            const {data}=await axios.post('/api/payment/orders',{payment_type,transaction_details,bank_transfer});
            await dispatch({type:PAYMENT_SUCCESS,payload:data})
            localStorage.setItem('paymentInfo',JSON.stringify(data));
        }catch(error){
            dispatch({
                type:PAYMENT_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            })
        }
    }catch(error){
        dispatch({
            type:PAYMENT_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
export const savePaymentDetails=(order1)=>async(dispatch,getState)=>{
    dispatch({type:PAYDETAILS_REQUEST,payload:order1});
    const {
        userSignin:{userInfo},
        
    }=getState();
    
    try {
        const {data}=await axios.put(`/api/payment/orders/${order1.order._id}/pay`,order1,{
            headers:{Authorization:`Bearer ${userInfo.token}`},
        });
        dispatch({type:PAYDETAILS_SUCCESS,payload:data});
        localStorage.setItem('paymentDetails',JSON.stringify(data));
    } catch (error) {
        dispatch({
            type:PAYDETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        }) 
    }
}
