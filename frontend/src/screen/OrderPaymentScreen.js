import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import { savePaymentDetails } from '../actions/paymentActions';
import CheckoutSteps from '../component/CheckoutSteps';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';



export default function OrderPaymentScreen() {
    const dispatch=useDispatch();
    const params=useParams();
    const {id:orderId}=params; 
    
    
    //------------------------------------------------------
    const orderDetails=useSelector((state)=>state.orderDetails);
    const {order,loading,error}=orderDetails;
    const payment=useSelector((state)=>state.payment);
    const {loading:loadingPay,error:errorPay,paymentInfo}=payment;
   //------------------------------------------------------

    useEffect(() => {
        if(!order || (order && order._id !==orderId)){
            dispatch(detailsOrder(orderId));
            
       }
       if(paymentInfo && order){
           dispatch (savePaymentDetails({order,paymentInfo}));
       }
    }, [dispatch,order,orderId,paymentInfo]);
    
    return  loading ? (<LoadingBox></LoadingBox>):
    error ?(<MessageBox variant="danger">{error}</MessageBox>):
     (
        
        <div>
            <CheckoutSteps steps1 steps2 steps3 steps4></CheckoutSteps>
            <div>
                <div className='deskripsi'>
                <ul>
                    
                    <li>
                        <div className='card'>
                            <h2>Payment</h2>
                            <>
                                {loadingPay? (<LoadingBox></LoadingBox>):
                                errorPay ?(
                                    <MessageBox variant="danger">{errorPay}</MessageBox>
                                ):(
                                
                                <ul>
                                    <li>
                                         <MessageBox variant="danger">
                                        <div className="row">
                                           <div>Status :</div>
                                            <strong>
                                                <div>Not Paid</div>
                                            </strong>
                                        </div>
                                        </MessageBox>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            
                                            <div>Order ID</div>
                                            <div>{order._id}</div>
                                            
                                        </div>
                                    </li>
                                    <li>    
                                        <div className='row'>
                                             <div>Payment Type : </div>
                                             <div>{paymentInfo.payment_type}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                             <div>Bank Name : </div>
                                             <div>{paymentInfo.bank}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                             <div>Virtual Account : </div>
                                             <div>{paymentInfo.Va}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                             <div>Transaction Time : </div>
                                             <div>{paymentInfo.transaction_time}</div>
                                        </div>
                                    </li>
                                    <li>
                                        
                                        <div className='row'>
                                            <div><strong><h2>Order Total</h2></strong></div>
                                            <div><strong><h2>${order.totalPrice.toFixed(2)}</h2></strong></div>
                                        </div>
                                        
                                    </li>
                                   
                                
                                </ul>
                                )}
                            </>    
                        </div>
                    </li>
                    
                </ul>
                </div>
                
            </div>
        </div>
      
    )
}
