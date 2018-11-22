import routes from '../routes';

export default app => {

    // Headers config

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin,X-Requested-With,Content-Type,Accept,Authorization',
        );
        res.header('Access-Control-Expose-Header', 'X-Total-Count');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,PATCH,DELETE');
            return res.status(200).json({});
        }
        next();
    });

    //  RESTful APIs' endpoints
    app.use('/api/v1', routes);

    // Error handling 

    app.use((req, res) => {
        res.status(404).json({ message: `Url not found ${req.url}` });
        res.status(500).json({ message: `Internal error` })
    });
};
