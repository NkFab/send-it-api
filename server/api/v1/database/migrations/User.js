import pool from "../db_con";
import env from "../../config/environment";
const User =
    `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR (50) UNIQUE NOT NULL,
        pass VARCHAR (50) NOT NULL,
        email VARCHAR (30) UNIQUE NOT NULL,
        created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP
      )`;

(
    () => {
        pool(env.development, User)
            .then(res => console.log("Table USERS was created..."))
            .catch(err => console.log(err))
    }
)()