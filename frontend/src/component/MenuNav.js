
import Modal from 'react-modal';
import { useState } from 'react';
import DebitKredit from './bankpay/DebitKredit';
import Bca from './bankpay/Bca';
import Mandiri from './bankpay/Mandiri';
import Bni from './bankpay/Bni';
import Permata from './bankpay/Permata';
import AtmNetwork from './bankpay/AtmNetwork';
import Bri from './bankpay/Bri';

Modal.setAppElement('#root')
const MenuNav=()=>{

    const [modalIsOpen,setModalIsOpen]=useState(false);
    const [bcaModalIsOpen,setBcaModalIsOpen]=useState(false);
    const [mandiriModalIsOpen,setMandiriModalIsOpen]=useState(false);
    const [bniModalIsOpen,setBniModalIsOpen]=useState(false);
    const [permataModalIsOpen,setPermataModalIsOpen]=useState(false);
    const [atmNetworkModalIsOpen,setAtmNetworkModalIsOpen]=useState(false);
    const [briModalIsOpen,setBriModalIsOpen]=useState(false);
    
    return(
        <div className="menu-bar">
            <ul>
                <li className='paymentmenu' onClick={()=>{setModalIsOpen(true);}}>Debit/Credit Card</li>
                   
                        {
                            modalIsOpen && 
                            <DebitKredit 
                                show={modalIsOpen} 
                                onClose={setModalIsOpen}
                            />
                        }
                
                 <li className='paymentmenu'>ATM/Bank Transfer
                    
                    <div className='sub-menu-1'>
                        <ul>
                            <li className='hove-me' onClick={()=>{setBcaModalIsOpen(true);}}>BCA</li>
                            {
                                bcaModalIsOpen && 
                                <Bca 
                                    showBca={bcaModalIsOpen} 
                                    onCloseBca={setBcaModalIsOpen}
                                />
                            }

                            <li className='hove-me' onClick={()=>{setMandiriModalIsOpen(true);}}>Mandiri</li>
                            {
                                mandiriModalIsOpen && 
                                <Mandiri 
                                    show={mandiriModalIsOpen} 
                                    onClose={setMandiriModalIsOpen}
                                />
                            }
                            
                            <li className='hove-me'  onClick={()=>{setBniModalIsOpen(true);}}>BNI</li>
                            {
                                bniModalIsOpen && 
                                <Bni 
                                    show={bniModalIsOpen} 
                                    onClose={setBniModalIsOpen}
                                />
                            }
                            
                            <li className='hove-me' onClick={()=>{setPermataModalIsOpen(true);}}>Permata</li>
                            {
                                permataModalIsOpen && 
                                <Permata 
                                    show={permataModalIsOpen} 
                                    onClose={setPermataModalIsOpen}
                                />
                            }
                            
                            <li className='hove-me' onClick={()=>{setAtmNetworkModalIsOpen(true);}}>ATM Network</li>
                            {
                                atmNetworkModalIsOpen && 
                                <AtmNetwork 
                                    show={atmNetworkModalIsOpen} 
                                    onClose={setAtmNetworkModalIsOpen}
                                />
                            }

                            <li className='hove-me' onClick={()=>{setBriModalIsOpen(true);}}>BRI</li>
                            {
                                briModalIsOpen && 
                                <Bri 
                                    show={briModalIsOpen} 
                                    onClose={setBriModalIsOpen}
                                />
                            }
                        </ul>
                    </div>
                </li>

                <li className='paymentmenu'>
                    GoPay/other e-Wallet
                </li>
                <li className='paymentmenu'>
                    KlikBCA
                </li>
                <li className='paymentmenu'>
                    BCA KlikPay
                </li>
                <li className='paymentmenu'>
                    BRImo
                </li>
                <li className='paymentmenu'>
                    Indomaret
                </li>
                <li className='paymentmenu'>
                    Alfa Group
                </li>
                
            </ul>
        </div>
    )
}
export default MenuNav