import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {login , logout, register,updateProfile} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(upload,register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated,upload,updateProfile);

export default router;