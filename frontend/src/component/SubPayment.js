import React from 'react';
import { useSelector } from 'react-redux';
import Bca from './bankpay/Bca';
export default function SubPayment() {
    const cart=useSelector((state)=>state.cart);
    
    function bcaPay() {
        <Bca>hai</Bca>
    }
  return (
        <div>
            {
                cart.paymentMethod==='debit_credit_card' ?(
                 <h2>debit_credit_card</h2>
                ):
                cart.paymentMethod==='atm' ?(
                    <div className='subpay'>
                        <h2>atm</h2>
                        
                        <ul>
                            <li>
                                <button onClick={bcaPay}>BCA</button>
                            </li>

                            <li>Mandiri</li>
                            <li>BNI</li>
                            <li>Permata</li>
                            <li>ATM Network</li>
                            <li>BRI</li>
                        </ul>
                    </div>
                ):
                cart.paymentMethod==='ewallet' ?(
                    <h2>ewallet</h2>
                ):
                cart.paymentMethod==='klikBca' ?(
                    <h2>klikBca</h2>
                ):
                cart.paymentMethod==='bcaKlikPay' ?(
                    <h2>bcaKlikPay</h2>
                ):
                cart.paymentMethod==='indomaret' ?(
                    <h2>indomaret</h2>
                ):
                cart.paymentMethod==='alfaGroup' ?(
                    <h2>alfaGroup</h2>
                ):
                cart.paymentMethod==='BriMo' ?(
                    <h2>BriMo</h2>
                )
                
                :(
                    <h2>Please Select Payment Method</h2>
                )
            }
               
            
        </div>
  )
}
