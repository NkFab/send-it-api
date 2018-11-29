import express from 'express';
// import morgan from 'morgan';
import { errors } from "celebrate";
import passport from "passport";
import routes from './routes/index'
import passportStategy from "./middlewares/passport"

const server = express();
//in express 4.* >= body parser has been added in express and called using methods json
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// server.use(morgan('combined'));
server.use(passport.initialize());
passportStategy(passport)

server.use('/api/v1', routes);

server.use((req, res) => {
    res.status(404).json({ message: `Url not found ${req.url}` });
    res.status(500).json({ message: `Internal error` })
});

server.use(errors());

const port = process.env.PORT || 8080;
server.listen(port, err => {
    if (err) {
        console.log('Server not running...', err);
    } else {
        console.log(`Listening to port ${port}`);
    }
});


export default server;