import express from 'express';
import passport from 'passport';
import loginController from '../controllers/loginController.js';

const router = express.Router();
router.get('/', loginController.login);
router.post(
  '/',
  (req, res, next) => {
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/inicio',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
  }
);



export default router;