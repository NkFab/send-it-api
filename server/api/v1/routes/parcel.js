import { Router } from 'express';
import passport from "passport";
import Parcel from '../controllers/parcel'

const router = Router();
router.use(passport.authenticate("jwt", { session: false, failureRedirect: '/api/v1/unauthorized' }))

router.get('/parcels', Parcel.getAllParcels);

router.get('/parcels/:id', Parcel.getParcelById);

router.get('/users/:id/parcels', Parcel.getParcelOrderByUser);

router.put('/parcels/:id/cancel', Parcel.cancelParcelOrder);

router.post('/parcels', Parcel.createParcelOrder);

router.post('/parcels/:id/presentLocation', Parcel.changePresentLoc);




export default router;