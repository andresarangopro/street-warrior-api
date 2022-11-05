
import User from '../models/UserModel.js'

import firebase from '../../storage/storage.js'
import {  ref, uploadBytes,getDownloadURL  } from "firebase/storage";

const storage = firebase

const getUserInfo=async (req, res) => {
    try{
        const data = await User.find()
        console.log(data)
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
};

const postUser=async (req, res) => {

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
                const data = new User({
                    name:req.body.name,
                    lastName:req.body.lastName,
                    dni:req.body.dni,
                    email: req.body.email,
                    bloodType:req.body.bloodType,
                    bornDate:req.body.bornDate,
                    emergencyContactNumber:req.body.emergencyContactNumber,
                    emergencyContactName:req.body.emergencyContactName,
                    phoneNumber:req.body.phoneNumber,
                    profileImage:[
                        url
                    ]
                })
                const dataToSave = await data.save();
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

export default { getUserInfo,postUser};