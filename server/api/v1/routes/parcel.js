import { Router } from 'express';

import Parcel from '../controllers/parcel'

const router = Router();
// const p = new Parcel();

router.get('/parcels', Parcel.getAllParcels);

// router.get('/parcels/:id', Parcel.getParcelById);

// router.get('/users/:id/parcels', Parcel.getParcelOrderByUser);

// router.put('/parcels/:id/cancel', Parcel.cancelParcelOrder);

// router.post('/parcels', Parcel.createParcelOrder);

export default router;