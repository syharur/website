import mongoose from 'mongoose';

const paymentSchema=new mongoose.Schema(
    {
        noId:{type:String,required:true},
        nama:{type:String,required:true},
        responMidtrans:{type:String,required:false},
    },
    {
        timestamps:true
    }
);
const Pay=mongoose.model('Pay',paymentSchema);
export default Pay;