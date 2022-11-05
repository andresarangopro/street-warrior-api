import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
    name:String,
    lastName:String,
    dni:String,
    email:String,
    bloodType:String,
    bornDate:Date,
    emergencyContactNumber:String, 
    emergencyContactName:String, 
    phoneNumber: String,
    profileImage:[String]
})


export default mongoose.model('users',User);