import { Router } from 'express';
import {
    getAllParcels,
    getParcelOrderByUser,
    getParcelById,
    cancelParcelOrder,
    createParcelOrder
} from '../controllers/parcel';
const router = Router();

router.get('/parcels', getAllParcels);

router.get('/parcels/:id', getParcelById);

router.get('/users/:id/parcels', getParcelOrderByUser);

router.put('/parcels/:id/cancel', cancelParcelOrder);

router.post('/parcels', createParcelOrder);

export default router;