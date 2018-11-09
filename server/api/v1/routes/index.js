import { Router } from "express";
import parcel from './parcel';

const router = Router();


const entry = router.get('/', (req, res, next) => {
    return res.status(200).json({ msg: "Ntabwo nkina" });
});
router.use(parcel, entry);
export default router;