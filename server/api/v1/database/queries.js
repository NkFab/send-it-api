import pool from "./db_con";
import env from "../config/environment";

class Queries {
    static findOneByID(id) {
        const query = {
            text: `SELECT * FROM users WHERE user_id = $1 LIMIT 1`,
            values: [id]
        };
        return pool(env.development || env.production, query)
            .then(res => {
                const { rows } = res;
                return rows[0]
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default Queries;

