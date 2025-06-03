import express from 'express';
const router = express.Router();


router.get(['/','/inicio'] ,(req, res) => res.render('index'));

export default router;