import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import {PayPalButton} from 'react-paypal-button-v2';

export default function OrderScreen() {
    const dispatch=useDispatch();
    const params=useParams();
    const {id:orderId}=params; 
    const [skdReady,setSdkReady]=useState(false);
    const orderDetails=useSelector((state)=>state.orderDetails);
    const {order,loading,error}=orderDetails;
    const orderPay=useSelector((state)=>state.orderPay);
    const {
        loading:loadingPay,
        error:errorPay,
        success:successPay
    }=orderPay;

    useEffect(() => {
        const addPaypalScript=async() =>{
            const {data}=await axios.get('/api/config/paypal');
            const script=document.createElement('script');
            script.type='text/javascript';
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async=true;
            script.onload=()=>{
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if(!order || successPay || (order && order._id !==orderId)){
             dispatch(detailsOrder(orderId));
        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPaypalScript();
                }else{
                    setSdkReady(true);
                }
            }
        }
       
    }, [dispatch,successPay,order,orderId,skdReady]);

    const successPaymentHandler =(paymentResult)=>{
        //todo : paypal payment handler
        dispatch(payOrder(order,paymentResult))
    }
    return loading ? (<LoadingBox></LoadingBox>):
    error ?(<MessageBox variant="danger">{error}</MessageBox>):
    (
        <div>
            <h1>Order {order._id}</h1>
            <div className='row top'>
                <div className='col-2'>
                <ul>
                    <li>
                        <div className='card card-body'>
                            <h2>Shipping</h2>
                            <p>
                                <strong> Name :</strong>{order.shippingAddress.fullName}<br />
                                <strong> Address :</strong>{order.shippingAddress.address},
                                {order.shippingAddress.city},{order.shippingAddress.postCode},
                                {order.shippingAddress.country}<br />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className='card card-body'>
                            <h2>Payment</h2>
                            <p>
                                <strong> Method :</strong>{order.paymentMethod}
                                
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className='card card-body'>
                            <h2>Order Items</h2>
                            <ul>
                                {order.orderItems.map((item)=>(
                                        <li key={item.product}>
                                        <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.nama}
                                                        className="small"
                                                    ></img>
                                                </div>
                                        
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.nama}</Link>
                                                </div>                                    
                                                <div>
                                                    {item.qty} x ${item.price} = ${item.qty*item.price}
                                                </div>
                                                

                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {!skdReady?(
                                            <LoadingBox></LoadingBox>
                                        ):(
                                            <>
                                            {errorPay && (
                                                <MessageBox variant="danger">{errorPay}</MessageBox>
                                            )}
                                            {loadingPay && <LoadingBox></LoadingBox>}
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            ></PayPalButton>
                                            </>
                                        )}
                                    </li>
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
