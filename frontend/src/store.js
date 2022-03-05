import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { paymentDetailsReducer, paymentReducer } from './reducers/paymentReducer';
import { productDetailsReducer } from './reducers/productDetailsReducer';
import { productListReducer } from './reducers/productReducers';
import { userDetailsReducer, userRegisterReducer, userSignReducer, userUpdateReducer } from './reducers/userReducers';

const initialState={
    userSignin:{
        userInfo:localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },    
    cart:{
        cartItems:localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')) : [],
    
        shippingAddress:localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod:localStorage.getItem('paymentMethod')
        ? JSON.parse(localStorage.getItem('paymentMethod'))
        : {},
    },
    payment:{
        paymentInfo:localStorage.getItem('paymentInfo')
        ? JSON.parse(localStorage.getItem('paymentInfo')) : null,
        paymentDetails:localStorage.getItem('paymentDetails')
        ? JSON.parse(localStorage.getItem('paymentDetails')) : null,
    },
        
};
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSignReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMineList:orderMineListReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateReducer,
    payment:paymentReducer,
    paymentDetails:paymentDetailsReducer,
    //orderlist:orderListReducer,
});
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
    );
export default store;
