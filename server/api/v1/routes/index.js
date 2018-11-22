import { Router } from "express";
import parcel from './parcel';
import { createTable } from '../database/db';
const router = Router();

const testEntry = router.post('/test', async (req, res, next) => {
    let response = await createTable()
    return res.status(200).json({ msg: "A table was created" });
});
router.use(parcel, testEntry);
export default router;