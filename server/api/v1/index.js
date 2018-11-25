import express from 'express';
import morgan from 'morgan';
import middlewares from './middlewares';

const server = express();
//in express 4.* >= body parser has been added in express and called using methods json
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('combined'));
middlewares(server);

const port = 3000 || 8080;
server.listen(port, err => {
    if (err) {
        console.log('Server not running...', err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});


export default server;