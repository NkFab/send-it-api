import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export default (env, sqlQuery = '') => {
    const pool = new Pool({ connectionString: env });
    return new Promise((resolve, reject) => {
        pool
            .query(sqlQuery)
            .then(res => {
                resolve(res)
                pool.end();
            })
            .catch(err => {
                reject(err)
                pool.end();
            });
    });
};

