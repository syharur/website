import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';



export default function OrderDetails() {
    const dispatch=useDispatch();
    const params=useParams();
    const {id:orderId}=params; 
    //const [skdReady,setSdkReady]=useState(false);
    const orderDetails=useSelector((state)=>state.orderDetails);
    const {order,loading,error}=orderDetails;
    
    useEffect(() => {
        if(!order || (order && order._id !==orderId)){
            dispatch(detailsOrder(orderId));
            //dispatch (savePaymentDetails({order,paymentInfo}));
       }
    }, [dispatch,order,orderId]);
    
    return  loading ? (<LoadingBox></LoadingBox>):
    error ?(<MessageBox variant="danger">{error}</MessageBox>):
     (
        
        <div>
            <div className='row top'>
                <div className='col-2'>
                <ul>
                    <li>
                        <div className='card card-body'>
                            <ul>
                                <li>
                                     <h2>Shipping</h2>
                                </li>
                               
                               
                                    <li>
                                        <div className='row'>
                                            <div><strong> Name :</strong></div>
                                            <div>{order.shippingAddress.fullName}<br /></div>
                                            
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div> <strong> Address :</strong></div>
                                            <div>{order.shippingAddress.address}</div>
                                           
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div> <strong> Kota :</strong></div>    
                                            <div>{order.shippingAddress.city},{order.shippingAddress.postCode}</div>
                                            
                                        
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div> <strong> Country :</strong></div>
                                            <div>{order.shippingAddress.country}<br /></div>
                                        </div>  
                                    </li>
                                  
                                
                            </ul>
                            
                        </div>
                    </li>
                    <li>
                        <div className='card card-body'>
                            <h2>Payment</h2>
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Status :</div>
                                        <strong>
                                            <MessageBox variant="danger">
                                                <div>Not Paid</div>
                                            </MessageBox>
                                        </strong>
                                    </div>
                                </li>
                               
                            </ul>
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
                                    <div>ID</div>
                                    <div><strong>{order._id}</strong></div>
                                </div>
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
                            
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      
    )
}
