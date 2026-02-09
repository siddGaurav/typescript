import Express from 'express'
import * as authController from '../controller/auth.controller.js';
// import { loginPRofile } from '../middleware/authmiddlewere.js';
// import { signupValidation } from '../middleware/authmiddlewere.js';
// import { signupValidation } from '../middleware/authmiddlewere.js';
// import { signupValidation } from '../middleware/authmiddlewere.js';


const authRouter = Express.Router();


authRouter.post("/signup", authController.signupAuth);
authRouter.post('/login', authController.loginProfile)







export default authRouter;