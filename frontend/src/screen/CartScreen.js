import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../component/MessageBox';
import { useParams,Link,useNavigate, useLocation } from 'react-router-dom';

export default function CartScreen() {
    const navigate=useNavigate();
    const params=useParams();
    const {id:productId}=params; 
    const {search}=useLocation();
    const qtyUrl=new URLSearchParams(search).get('qty');
    const qty=qtyUrl ? Number(qtyUrl):1;
    const cart=useSelector((state) => state.cart);
    const {cartItems}=cart;
 
    const dispatch=useDispatch();
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    }, [dispatch,productId,qty]);

    const removeFromHandler = (id)=>{
        //delete cart action
        dispatch(removeFromCart(id));
    }
        
    const checkoutHandler = () =>{
        navigate(`/signin?redirect=/shipping`);
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (<MessageBox>
                    Cart is Empty. <Link to="/">Go shopping</Link>
                </MessageBox>
                ):
                (
                    <ul>
                        {cartItems.map((item)=>(
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
                                            <select
                                                value={item.qty}
                                                onChange={(e) => 
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )}
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>${item.price}</div>
                                        
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromHandler(item.product)}
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )
                }
            </div>

            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                subtotal ({cartItems.reduce((a,c)=>a+c.qty,0)}items)
                                {cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button"
                             onClick={checkoutHandler} 
                             className="primary block" 
                             disabled={cartItems.length === 0}
                             > Proceed to Checkout
                             </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
       
    )
}

