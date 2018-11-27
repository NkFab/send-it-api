import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport"
import pool from "../database/db_con";
import env from "../config/environment"

const now = new Date();
export default class UserCont {
    static signUp(req, res) {
        const { username, pass, email } = req.body;
        const hashPass = bcrypt.hashSync(pass, 8);
        const query = {
            text: 'INSERT INTO users (username, pass, email, created_on) VALUES ($1,$2,$3,$4 )',
            values: [username, hashPass, email, now]
        };
        pool(env.development, query)
            .then(user => {
                res.status(201).json({ "message": "User was created", user });
                console.log(user.rows[0]);
            })
            .catch(err => res.status(500).json(err));
    }

    static signIn(req, res) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log(err);
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user: user
                });
            }

            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }

                const token = jwt.sign(user, process.env.JWTKEY);

                return res.json({ user, token });
            });
        })
            (req, res);
    }
} 