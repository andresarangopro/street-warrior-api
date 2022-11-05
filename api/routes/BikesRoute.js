import express from 'express';

import BikesController from '../controllers/BikesController.js';
import multer from 'multer'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage}).single('file');


router.get("/bikes/all", BikesController.listAllBikes)
router.post("/bikes", upload, BikesController.postBike)

export default router;