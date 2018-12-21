import {
  Router
} from 'express';
import passport from "passport";
import Parcel from '../controllers/parcel'
import Authorize from "../middlewares/authorization"

const router = Router();

const secure = passport.authenticate("jwt", {
  session: false,
  failureRedirect: '/api/v1/unauthorized'
});

router.get('/parcels', secure, Authorize.admin, Parcel.getAllParcels);

router.get('/parcels/:id', secure, Authorize.admin, Parcel.getParcelById);

router.get('/users/:id/parcels', secure, Authorize.user, Parcel.getParcelOrderByUser);

router.put('/parcels/:id/cancel', secure, Authorize.user, Parcel.cancelParcelOrder);

router.post('/parcels', secure, Authorize.user, Parcel.createParcelOrder);

router.put('/parcels/:id/presentLocation', secure, Authorize.admin, Parcel.changePresentLoc);

router.put('/parcels/:id/destination', secure, Authorize.user, Parcel.changeParcelDestination);

export default router;