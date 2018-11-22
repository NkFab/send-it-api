import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.PUSER,
    password: process.env.PPASS,
    database: process.env.PDB,
    port: process.env.PHOST,
});

pool.on('connect', () => {
    console.log('Connection is passing...');
});
pool.on('remove', () => {
    console.log('pool removed...');
})
export const createTable = async () => {
    console.log('it is there')
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            reflections(
            id UUID PRIMARY KEY,
            success VARCHAR(128) NOT NULL,
            low_point VARCHAR(128) NOT NULL,
            take_away VARCHAR(128) NOT NULL,
            created_date TIMESTAMP,
            modified_date TIMESTAMP
        )`;
    const results = await pool.query(queryText)
        .then(res => {
            console.log(res)
            pool.end()
        })
        .catch(err => {
            console.log(err)
            pool.end()
        })
}