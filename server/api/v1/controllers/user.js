
import pool from "../database/db_con";
import env from "../config/environment"

const now = new Date();
export default class UserCont {
    static signUp(res, req) {
        const { username, pass, email } = res.body;
        const query = {
            text: 'INSERT INTO users (username, pass, email, created_on) VALUES ($1,$2,$3,$4 )',
            values: [username, pass, email, now]
        };
        pool(env.development, query)
            .then(user => {
                req.status(201).json({ "message": "User was created", user });
                console.log(user.rows[0]);
            })
            .catch(err => req.status(500).json(err));
    };
} 