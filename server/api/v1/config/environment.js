import dotenv from "dotenv";

dotenv.config();

export default {
    development: process.env.DATABASE_URL,
    test: _,
    production: process.env.DATABASE_URL_HERO
};

