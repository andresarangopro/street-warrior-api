
import Bike from '../models/BikeModel.js'

import firebase from '../../storage/storage.js'
import XMLHttpRequest  from 'xhr2'
import { getStorage, ref, uploadBytes,getDownloadURL  } from "firebase/storage";
import { ObjectId } from 'mongodb';

const storage = firebase

const listAllBikes=async (req, res) => {
    try{
        const data = await Bike.find()
        console.log(data)
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
};

const postBike=async (req, res) => {

    try {
       // 
        //res.status(200).json(dataToSave)
        // Grab the file
        const file = req.file;
        // Format the filename
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;

        // Step 1. Create reference for file name in cloud storage 
        const imageRef = ref(storage,fileName);
        // Step 2. Upload the file in the bucket storage
        uploadBytes(imageRef, file.buffer).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async url => {
                const data = new Bike({
                    brand:req.body.brand,
                    cc:req.body.cc,
                    placa:req.body.placa,
                    model:req.body.model,
                    userId:ObjectId(req.body.userId),
                    soatDateStart:req.body.soatDateStart,
                    tecnoDateStart:req.body.tecnoDateStart,
                    images:[
                        url
                    ]
                })
                const dataToSave = await data.save();
                console.log('Download URL', url)
                res.send(dataToSave)
            })
 
        })
        
       // const snapshot = await imageRef.put(file.buffer);
        // Step 3. Grab the public url
        //const downloadURL = await snapshot.ref.getDownloadURL();
       // res.status(200).json("image: ", downloadURL)
   
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
};

export default { listAllBikes,postBike};