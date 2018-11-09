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

router.get('/parcels/:parcelid', getParcelById);

router.get('/users/:userId/parcels', getParcelOrderByUser);

router.put('/parcels/:parcelId/cancel', cancelParcelOrder);

router.post('/parcels', createParcelOrder);

export default router;