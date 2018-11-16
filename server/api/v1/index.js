import express from 'express';

import middlewares from './middlewares';

const server = express();
server.use(express.json())
middlewares(server);

const port = process.env.PORT || 8000;
server.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});


export default server;