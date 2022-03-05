import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';

export default function AtmNetwork({show,onClose}) {

  const cart=useSelector((state)=>state.cart);
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [cardNumber,setCardNumber]=useState('');
  const [expireDate,setExpireDate]=useState('');
  const [cvv,setCvv]=useState('');

  const submitHandler =(e) =>{
    e.preventDefault();
    // do register action
   
   
};
  return (
    <div className='debitkredit'>
      <Modal 
        isOpen={show}
          style={
                  {
                    overlay:{
                      position:'absolute',
                      top:0,
                      button:0,
                      left:0,
                      right:0,
                      backgroundColor: 'rgba(255, 255, 255, 0.75)',
                      display:'flex'
                    },
                    content:{
                      top:'25%',
                      left:'25%',
                      width:'50%',
                      height:'50%',
                    }
                  }
          }
         >
                                   
        <div className='card card-body'>
          <div>
            <h2>ATM/Bank Transfer ATM Network</h2>
            
              <ul>
                <li>
                  <div className='row'>
                    <div className='total'>Total</div>
                    <div className='total'>
                      Rp. {cart.totalPrice}
                    </div>
                  </div>  
                </li>
              </ul>
          
            
            
          </div>
        </div>

        <div className='card card-body'>
          <form className='form' onSubmit={submitHandler}>
                
              
               
                <div>
                     <input type="email" id="email" placeholder='Enter Email' required
                        onChange={e => setEmail(e.target.value)}>
                     </input>
                </div>
                <div>
                    <input type="text" id="phone" placeholder='Enter Phone' required
                        onChange={e => setPhone(e.target.value)}>
                     </input>
                </div>
                <div>
                    <input type="text" id="cardNumber" placeholder='Enter Card Number' required
                        onChange={e => setCardNumber(e.target.value)}>
                     </input>
                </div>
                <div>
                    <input type="text" id="expireDate" placeholder='Enter Expire Date' required
                        onChange={e => setExpireDate(e.target.value)}>
                     </input>

                </div>
                <div>
                    <input type="text" id="cvv" placeholder='Enter CVV' required
                        onChange={e => setCvv(e.target.value)}>
                     </input>
                     
                </div>
                <div>
                    
                    <button className='primary' type='submit'>
                        Pay Now
                    </button>
                   
                </div>
                
          </form>
            <div className='btn-close-modal'>
              <label onClick={()=>onClose(false)}>X</label>
            </div>
      </div>                       
      </Modal> 
      

    </div>
    
  )
}
