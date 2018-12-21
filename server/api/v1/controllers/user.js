/**
 * Configurations from 
 * https://www.npmjs.com/package/jsonwebtoken
 * https://www.npmjs.com/package/bcrypt
 * 
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../database/db_con";
import env from "../config/environment"
import { jwtsecret } from "../config/secret"
const now = new Date();
export default class UserCont {
    static signUp(req, res) {
        const { username, pass, email, user_type } = req.body;
        const hashPass = bcrypt.hashSync(pass, 8);
        const query = {
            text: 'INSERT INTO users (username, pass, email, user_type, created_on) VALUES ($1,$2,$3,$4,$5 ) RETURNING *',
            values: [username, hashPass, email, user_type, now]
        };
        pool(query)
            .then(user => {
                res.status(201).json({ "message": "User was created" });
                console.log(user.rows[0]);
            })
            .catch(err => res.status(500).json(err));
    }

    static signIn(req, res) {
        const { email, pass } = req.body;
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        }
        pool(query)
            .then(user => {
                if (!user.rows[0]) {
                    return res.status(404).json({ message: "There is no such email" })
                }
                bcrypt.compare(pass, user.rows[0].pass)
                    .then(matched => {
                        if (matched) {
                            let payload = { ...user.rows[0] };
                            delete payload.pass;
                            jwt.sign(
                                payload,
                                jwtsecret.secret,
                                // { expiresIn: 3600 },
                                (err, token) => {
                                    res.status(200).json({ message: "Success", token })
                                    res.status(500).json(err)
                                }
                            );
                        } else {
                            res.status(404).json({ message: "Email or password invalid" })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: "bycrypt wapi", ...err })
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "db wapi", ...err })
            })
    }
} 