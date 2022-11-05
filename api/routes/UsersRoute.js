import express from 'express';

import UsersController from '../controllers/UserController.js';
import multer from 'multer'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage}).single('file');


router.get("/users", UsersController.getUserInfo)
router.post("/users", upload, UsersController.postUser)

export default router;