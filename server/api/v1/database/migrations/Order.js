import pool from "../db_con";
import env from "../../config/environment";
const Order =
  `CREATE TABLE IF NOT EXISTS 
  orders(
    order_ref SERIAL PRIMARY KEY,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    beneficiary VARCHAR(100) NOT NULL,
    pick_date TIMESTAMP NOT NULL,
    price DECIMAL NOT NULL,
    name_parcel VARCHAR(100) NOT NULL,
    weight DECIMAL NOT NULL,
    description VARCHAR(200),
    status CHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    user_id INT references users
  )`;


(
  () => {
    setTimeout(() => {
      pool(env.development, Order)
        .then(res => console.log("Table ORDERS was created..."))
        .catch(err => console.log(err))
    }, 5000)
  }
)()