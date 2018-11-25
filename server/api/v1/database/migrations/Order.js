import pool from "../db_con";
import env from "../../config/environment";
const Order =
  `CREATE TABLE IF NOT EXISTS 
  orders(
    order_no SERIAL PRIMARY KEY,
    origin VARCHAR(20) NOT NULL,
    destination VARCHAR(20) NOT NULL,
    beneficiary VARCHAR(20) NOT NULL,
    pick_date TIMESTAMP NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    user_id INT references users,
    ref INT references parcels
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