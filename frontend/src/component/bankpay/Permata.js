import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { paymentDescription} from '../../actions/paymentActions';
import { useNavigate } from 'react-router-dom';




export default function Permata({show,onClose}) {
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const orderDetails=useSelector((state)=>state.orderDetails);
  const {order}=orderDetails;
  
  let payment_type='bank_transfer';
  let transaction_details= {
    gross_amount: parseInt(order.totalPrice),
    order_id:order._id,
  };
  let bank_transfer={
    bank:'permata'
  };

  const submitHandler =(e) =>{
    e.preventDefault();
      dispatch(paymentDescription(payment_type, { transaction_details }, { bank_transfer }));
      navigate(`/payorder/${order._id}`)  
      onClose(false);
     
      
      
    
    
    
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
                      top:'33%',
                      left:'30%',
                      width:'40%',
                      height:'33%',
                    }
                  }
          }
         >
                                   
        <div className='card card-body'>
          <div>
            <h2>ATM/Bank Transfer Permata</h2>
            
              <ul>
                <li>
                  <div className='row'>
                    <div className='total'>Total</div>
                    <div className='total'>
                      Rp. {order.totalPrice}
                    </div>
                  </div>  
                </li>
              </ul>
          
            
            
          </div>
        </div>

        <div className='card card-body'>
          <ul>
              <li>
                <div className='row'>
                    <div>ID</div>
                    <div>{order._id}</div>
                </div>
              </li>
              <li>
                    <div className='row'>
                        <div>Payement Type</div>
                        <div>Bank Transfer</div>
                    </div>
              </li>
              <li>
                <div className='row'>
                    <div>Bank Name </div>
                    <div>Permata</div>
                </div>
              </li>
              <li>
                <button className='primary block' type='submit' onClick={submitHandler}>
                    Pay Now
                </button>
              </li>
          </ul>
            <div className='btn-close-modal'>
              <label onClick={()=>onClose(false)}>X</label>
            </div>
      </div>                       
      </Modal>
    </div>
    
  )
}
