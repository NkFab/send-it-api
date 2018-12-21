import dotenv from "dotenv";

dotenv.config();

export default {
    development: process.env.DATABASE_URL_LOCAL,
    test: process.env.DATABASE_URL_TEST,
    production: process.env.DATABASE_URL
};

