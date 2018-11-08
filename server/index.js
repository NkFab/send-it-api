import express from 'express';
import { createServer } from 'http';

import middlewares from './api/v1/middlewares';

const app = express();
middlewares(app);
const server = createServer(app);

const port = process.env.PORT || 8000;
server.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});

