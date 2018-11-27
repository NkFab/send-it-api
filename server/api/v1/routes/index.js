import { Router } from "express";
import parcel from './parcel';
import user from './auth'
const router = Router();

router.get('/unauthorized', (req, res) => {
    res.status(401).json({ message: "Unauthorized access" })
})

router.use(parcel, user);
export default router;