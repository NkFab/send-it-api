/**
 * Referred to Arpy Vanyan
 * https://medium.com/@arpyvanyan
 * */
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import Queries from "../../database/queries";

dotenv.config();
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const passportStategy = (passport) => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWTKEY
    },
        (jwtPayload, next) => {
            return Queries.findOneByID(jwtPayload.id)
                .then(user => {
                    return next(null, user);
                })
                .catch(err => {
                    return next(err);
                });
        }
    ));
}


export default passportStategy;