import { Router } from "express";
import parcel from './parcel';

const router = Router();

router.use(parcel);
export default router;