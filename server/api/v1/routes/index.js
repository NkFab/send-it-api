import { Router } from "express";
import parcel from './parcel';
import user from './user'
const router = Router();

router.use(parcel, user);
export default router;