import { PAYDETAILS_FAIL, PAYDETAILS_REQUEST, PAYDETAILS_SUCCESS, PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_RESET, PAYMENT_SUCCESS } from '../constants/paymentConstan.js';

export const paymentReducer=(state={},action)=>{
    switch (action.type) {
        case PAYMENT_REQUEST:
            return { ...state,loading:!state.loading };
        case PAYMENT_SUCCESS:
            return { ...state,loading:false,paymentInfo:action.payload };
        case PAYMENT_FAIL:
            return {...state,loading:false,error:action.payload};
        case PAYMENT_RESET:
            return {};
        default:
            return state;
    }
}
export const paymentDetailsReducer=(state={},action)=>{
    switch (action.type) {
        case PAYDETAILS_REQUEST:
            return { loading:true };
        case PAYDETAILS_SUCCESS:
            return { loading:false,success:true,paymentDetails:action.payload};
        case PAYDETAILS_FAIL:
            return {loading:false,error:action.payload};
        
        default:
            return state;
    }
}