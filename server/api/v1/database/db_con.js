import { Pool } from "pg";
import dotenv from "dotenv";
import environment from '../config/environment'
dotenv.config();

const env = process.env.NODE_ENV || 'development'
export default(sqlQuery = '') => {
    const pool = new Pool({ connectionString: environment[env] });
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

