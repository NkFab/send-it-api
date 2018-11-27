import pool from "./db_con";
import env from "../config/environment";

class Queries {
    static findOneByID(id) {
        const query = {
            text: `SELECT * FROM users WHERE user_id = $1 LIMIT 1`,
            values: [id]
        };
        pool(env.development, query)
            .then(res => {
                const { rows } = res;
                console.log(rows[0])
            })
            .catch(err => {
                console.log(err)
            })
    }
    static findOne(username, password) {
        const query = {
            text: `SELEC * FROM users WHERE username = $1 AND password = $2`,
            values: [username, password]
        };
        pool(env.development, query)
            .then(res => {
                const { rows } = res;
                console.log(rows[0])
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default Queries;

