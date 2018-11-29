import pool from "../db_con";
import env from "../../config/environment";
const User =
    `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR (50) UNIQUE NOT NULL,
        pass VARCHAR (200) NOT NULL,
        email VARCHAR (50) UNIQUE NOT NULL,
        user_type VARCHAR (20) NOT NULL,
        created_on TIMESTAMP NOT NULL
      )`;

(
    () => {
        pool(env.development, User)
            .then(res => console.log("Table USERS was created..."))
            .catch(err => console.log(err))
    }
)()