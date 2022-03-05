import React from 'react'

export default function CheckoutSteps(props) {
    return (
        <div className='row checkout-steps'>
            <div className={props.steps1 ? 'active': ''}>1 Sign In</div>
            <div className={props.steps2 ? 'active': ''}>2 Shipping</div>
            <div className={props.steps3 ? 'active': ''}>3 Payment Type</div>
            <div className={props.steps4 ? 'active': ''}>4 Payment Order</div>
        </div>
    )
}
