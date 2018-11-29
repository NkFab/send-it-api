import { Router } from "express";
import User from "../controllers/user";
import Validate from "../middlewares/validations";
const router = Router();

router.post('/auth/signup', User.signUp);

router.post('/auth/login', Validate.login(), User.signIn);

export default router; 