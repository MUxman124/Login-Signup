import express from 'express';
import AuthControllers from '../controllers/auth.js';
import Validator from '../middlewares/validator.js';
import Authenticator from '../middlewares/authenticator.js';
import endpoints from './endpoints.js';

const router = express.Router();

router.post(endpoints.signupUser, Validator.signupUser, AuthControllers.signupUser);
router.post(endpoints.loginUser, Validator.loginUser, AuthControllers.loginUser);
router.put(endpoints.updatePassword, Authenticator, Validator.updatePassword, AuthControllers.updatePassword);
router.delete(endpoints.deleteAccount, Authenticator, Validator.deleteAccount, AuthControllers.deleteAccount);

export default router;