import pool from "../db_con";
import env from "../../config/environment";
const Parcel =
    `CREATE TABLE IF NOT EXISTS
parcels(
ref SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
weight VARCHAR(128) NOT NULL,
description VARCHAR(128),
status CHAR(20) NOT NULL
)`;
(
    () => {
        pool(env.development, Parcel)
            .then(res => console.log("Tabel PARCELS was created..."))
            .catch(err => console.log(err))
    }
)() 