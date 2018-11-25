import { Pool } from "pg";

export default (env = {}, sqlQuery = '') => {
    const pool = new Pool(env);
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

