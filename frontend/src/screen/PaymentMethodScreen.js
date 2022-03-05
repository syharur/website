import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../component/CheckoutSteps';
import {savePaymentMethod} from '../actions/cartActions.js';

export default function PaymentMethodScreen() {
    const navigate=useNavigate();
    const [paypalMethod,setPaymentMethod]=useState('');
    const cart=useSelector((state)=>state.cart);
    const {shippingAddress}=cart;
    /*if(!shippingAddress.address){
        navigate('/shipping');
    }*/
    useEffect(() => {
        if (!shippingAddress.address){
         navigate("/shipping")   
        }
    },[navigate,shippingAddress.address])
    
    const dispatch=useDispatch();
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paypalMethod));
        navigate('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps steps1 steps2 steps3></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id='paypal' 
                            value="paypal" 
                            name='paypalMethod' 
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='paypal'>Paypal</label>

                    </div>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id='stripe' 
                            value="stripe" 
                            name='paypalMethod' 
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='stripe'>Stripe</label>
                    </div>
                </div>
                <div>    
                    <div>
                        <button className='primary block' type='submit'>
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
