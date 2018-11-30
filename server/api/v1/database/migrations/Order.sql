  CREATE TABLE IF NOT EXISTS 
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
    user_id INT references users
  )