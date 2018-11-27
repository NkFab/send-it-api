import { Router } from "express";
import User from "../controllers/user"

const router = Router();

router.post('/auth/signup', User.signUp);

router.post('/auth/login', User.signIn);


export default router;