import express from 'express';
import { ensureAuthenticated } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.get(['/','/inicio'] ,ensureAuthenticated ,(req, res) => res.render('index'));

export default router;