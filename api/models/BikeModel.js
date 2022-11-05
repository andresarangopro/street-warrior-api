import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Bike = new Schema({
    brand:String,
    cc:Number,
    placa:String,
    model:Number,
    soatDateStart:Date,
    tecnoDateStart:Date,
    userId:ObjectId,
    images:[String]
})


export default mongoose.model('bikes',Bike);