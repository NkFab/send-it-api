/**
 * Referred to Arpy Vanyan
 * https://medium.com/@arpyvanyan
 * */
import passportJWT from "passport-jwt";
import Queries from "../database/queries";
import { jwtsecret } from "../config/secret";

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const passportStategy = (passport) => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtsecret.secret
    },
        (jwtPayload, done) => {
            Queries.findOneByID(jwtPayload.user_id)
                .then(user => {
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });
        }
    ));
}


export default passportStategy;