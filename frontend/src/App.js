
import React from 'react';
import HomeScreen from './screen/HomeScreen.js';
import {Routes,Route,Link} from 'react-router-dom';
import ProductScreen from './screen/ProductScreen.js';
import CartScreen from './screen/CartScreen.js';
import SigninSreen from './screen/SigninSreen.js';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions.js';
import RegisterScreen from './screen/RegisterScreen.js';
import ShippingAddressScreen from './screen/ShippingAddressScreen.js';
import PaymentMethodScreen from './screen/PaymentMethodScreen.js';
import PlaceOrderScreen from './screen/PlaceOrderScreen.js';
import OrderScreen from './screen/OrderScreen.js';
import OrderHistoryScreen from './screen/OrderHistoryScreen.js';
import ProfileScreen from './screen/ProfileScreen.js';
import PrivateRoute from './component/PrivateRoute.js';
import PaymentScreen from './screen/PaymentScreen.js';
import OrderPaymentScreen from './screen/OrderPaymentScreen.js';
//import PaymentScreen from './screen/PaymentScreen.js';

function App() {
    const cart=useSelector((state) => state.cart);
    const {cartItems}=cart;
    const userSignin=useSelector((state)=>state.userSignin);
    const {userInfo}=userSignin;
    const dispatch=useDispatch();
    const signOutHandler=()=>{
        dispatch(signout());
    }
  return (
    
    <div className="grid-container">
        <header className="row">
            <div>
                <Link to="/">Mywebsite</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                    {cartItems.length>0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                </Link>
                {
                    userInfo ?(
                        <div className='dropdown'>
                            <Link to="#">{userInfo.nama}<i className='fa fa-caret-down'></i>{''}</Link>
                            <ul className='dropdown-content'>
                                <li>
                                    <Link to="/profile">User Profile</Link>
                                </li>
                                <li>
                                    <Link to="/orderhistory">Order History</Link>
                                </li>
                                <li>
                                     <Link to='#signout' onClick={signOutHandler}>Sign Out</Link>
                                </li>
                               
                            </ul>
                        </div>
                    ):
                    (
                        <Link to="/signin">Singin</Link>
                    )
                }
                {
                    userInfo && userInfo.isAdmin && (
                        <div className='dropdown'>
                            <Link to="#admin">
                                Admin <i className='fa fa-caret-down'></i>
                            </Link>
                            <ul className='dropdown-content'>
                                <li>
                                    <Link to="/paymentScreen">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/productlist">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist">Orders</Link>
                                </li>
                                <li>
                                    <Link to="/userlist">Users</Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
                
            </div>
        </header>
        <main>
            <Routes>
            <Route path="/cart" element={<CartScreen />} />
                <Route path="/cart/:id" element={<CartScreen />} />
                <Route path="/" exact element={<HomeScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/signin" element={<SigninSreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/shipping" element={<ShippingAddressScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/orderhistory" element={<OrderHistoryScreen />} />
                <Route path="/paymentmethod/:id" element={<PaymentScreen />} />
                <Route path="/payorder/:id" element={<OrderPaymentScreen />} />
                <Route 
                    path="/profile" 
                    element={
                        <PrivateRoute>
                            <ProfileScreen />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </main>
        <footer className="row center">
              All Good
        </footer>
        </div>
   
  );
  
}

export default App;