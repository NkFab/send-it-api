import dotenv from "dotenv";

dotenv.config();

export default {
    development: {
        user: process.env.PUSER,
        host: process.env.PHOST,
        database: process.env.PDB,
        port: process.env.PORT,
        password: process.env.PPASS,
    },
    test: {
        user: process.env.PUSER,
        host: process.env.PHOST,
        database: process.env.PDB,
        port: process.env.PORT,
        password: process.env.PPASS,
    },
    production: {
        user: process.env.User,
        host: process.env.Host,
        database: process.env.Database,
        port: process.env.Port,
        password: process.env.Password,
    },
};

