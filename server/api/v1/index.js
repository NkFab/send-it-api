import express from 'express';
import morgan from 'morgan';
import middlewares from './middlewares';

const server = express();
//in express 4.* >= body parser has been added in express and called using methods json
server.use(express.json());
server.use(morgan('combined'));
middlewares(server);

const port = process.env.PORT || 8000;
server.listen(port, err => {
    if (err) {
        console.log('Server not running...', err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});


export default server;