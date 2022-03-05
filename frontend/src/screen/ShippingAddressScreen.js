import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../component/CheckoutSteps'
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';


export default function ShippingAddressScreen() {
    const navigate=useNavigate();
    const userSignin=useSelector((state)=> state.userSignin);
    const {userInfo}=userSignin;
    useEffect(() => {
        if (!userInfo){
         navigate("/signin")   
        }
    },[navigate,userInfo])

    const cart =useSelector((state)=>state.cart);
    const {shippingAddress}=cart;

    const [fullName,setFullName]=useState(shippingAddress.fullName || '');
    const [address,setAddress]=useState(shippingAddress.address ||'');
    const [city,setCity]=useState(shippingAddress.city ||'');
    const [postCode,setPostCode]=useState(shippingAddress.postCode ||'');
    const [country,setCountry]=useState(shippingAddress.country ||'');
    const dispatch=useDispatch();
    
    //---------------------------------------------------------------
    const orderCreate=useSelector((state)=>state.orderCreate);
    const {loading,success,error,order}=orderCreate;
    const toPrice=(num)=> Number(num.toFixed(2));
    cart.itemsPrice=toPrice(
        cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0)
    );
    cart.shippingPrice=cart.itemsPrice>100 ? toPrice(0) : toPrice(10);
    cart.taxPrice=toPrice(0.15*cart.itemsPrice);
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice;
   //------------------------------------------------------------------

   
    

    const submitHandler=(e)=>{
        e.preventDefault();
        // do dispatch save shipping address
        dispatch(saveShippingAddress({fullName,address,city,postCode,country}));
        dispatch(createOrder({...cart,orderItems:cart.cartItems}));
        //navigate('/paymentmethod');
    }

     useEffect(() => {
        if(success){
            navigate(`/paymentmethod/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET});
            
        }
        
    }, [dispatch,order,navigate,success]);

    return (
        <div>
            <CheckoutSteps steps1 steps2></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor='fullname'>Full Name</label>
                    <input 
                        type="text"
                        id='fullname'
                        placeholder='Enter Full Name'
                        value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                        required
                    ></input>

                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input 
                        type="text"
                        id='address'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        required
                    ></input>

                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input 
                        type="text"
                        id='city'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                        required
                    ></input>

                </div>
                <div>
                    <label htmlFor='postCode'>Postal Code</label>
                    <input 
                        type="text"
                        id='postCode'
                        placeholder='Enter Postal Code'
                        value={postCode}
                        onChange={(e)=>setPostCode(e.target.value)}
                        required
                    ></input>

                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input 
                        type="text"
                        id='country'
                        placeholder='Enter Country'
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                        required
                    ></input>

                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>Countinue</button>
                    
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
            </form>
        </div>
    )
}
