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
    profileImage:[String]
})


export default mongoose.model('users',User);