import { Router } from "express";
import Users from "../controllers/user"

const router = Router();

router.post('/auth/signup', Users.signUp)

export default router;