/**
 * credit goes to Arpy Vanyan
 * https://medium.com/@arpyvanyan
 * */

import passport from "passport";
import passportJWT from "passport-jwt";
import LocalStrategy from "passport-local";
import dotenv from "dotenv";
import Queries from "../../database/queries";

dotenv.config();
const ExtractJWT = passportJWT.ExtractJwt;
const LclStrat = LocalStrategy.Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LclStrat({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, next) => {
        return Queries.findOne({ email, password })
            .then(user => {
                if (!user) {
                    return next(null, false, { message: 'Incorrect email or password.' });
                }

                return next(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return next(err);
            });
    }
));

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

export default passport;

// import passport from "passport";
// import passportJWT from "passport-jwt";
// import Queries from "../../database/queries";

// const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;

// let jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken;
// jwtOptions.secretOrKey = process.env.JWTKEY;

// const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
//     console.log('payload received', jwt_payload);

//     Queries.getUser(jwt_payload.id)
//         .then(user => {
//             if (user) {
//                 next(null, user)
//             } else {
//                 next(null, false, "Unauthorized")
//             }
//         })
//         .catch(err => {
//             console.log(err)
//         })

// });

// passport.use(strategy);

// export default passport;