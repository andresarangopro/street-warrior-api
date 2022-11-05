import express from 'express';
import BikesRoute from './BikesRoute.js';
import UsersRoute from './UsersRoute.js';

const router = express.Router();

router.use("/api", BikesRoute)
router.use("/api", UsersRoute)

export default router;