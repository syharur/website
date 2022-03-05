import React, { useEffect} from 'react'
import Product from '../component/Product';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import { PAYMENT_RESET } from '../constants/paymentConstan';

export default function HomeScreen() {
  const dispatch=useDispatch();
  const productList=useSelector((state)=>state.productList);
  const {loading,error,products}=productList;

  useEffect(()=>{
    dispatch(listProducts())
    dispatch({type:PAYMENT_RESET});
  ;},[dispatch])
    return (
      <div>
        {loading ?(
          <LoadingBox></LoadingBox>
        ): error ?(
          <MessageBox variant="danger">{error}</MessageBox>
        ):(
          <div className="row center">
                {
                  products.map(product=>(
                  <Product key={product._id} product={product}></Product>
                  ))
                }
          </div>
        )}
      </div>  
    )
}
