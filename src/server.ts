import { Request, Response, NextFunction, Express } from 'express';
import express = require('express');
import bodyParser = require('body-parser');

export default class Server {
    public app: Express;
    
    constructor() {
        this.app = express();
    }

    /**
     * SetupMiddlewares
     */
    public SetupMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    /**
     * SetupRoutes
     */
    public SetupRoutes() {
        this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(req.query);
            return;
        });
    }

    /**
     * Listen
     */
    public Listen(port: number = 5000) {
        this.app.listen(port, () => console.log(`Server is running on port ${port}`));
    }

    /*
    * One stop shop for initializing server
    */
    public startServer() {
        this.SetupMiddlewares();
        this.SetupRoutes();
        this.Listen();
    }
}