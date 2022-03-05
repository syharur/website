import React from 'react'

import CheckoutSteps from '../component/CheckoutSteps';
import MenuNav from '../component/MenuNav';
import OrderDetails from './OrderDetails';

export default function PaymentScreen() {

return (
        <div>
            <CheckoutSteps steps1 steps2 steps3></CheckoutSteps>
            
            <div className='container-home'>
            
                <div id='sidenavmenuhome'>
                    <div>
                        <MenuNav />
                    </div>
                </div>
                <div id='paymethodhome'>
                    <div>
                        <OrderDetails />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
