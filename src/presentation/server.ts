import express, { Router } from 'express';
import compression from 'compression';

interface Options {
    port: number;
    routes: Router;
  }

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    //DI
    constructor(options : Options){
        this.port = options.port;
        this.routes = options.routes;

        this.middleware();

        this.router();
    }


    //* Middleware
    private middleware = () => {
    this.app.use( express.json() ); // raw JSON
    this.app.use( express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(compression());
    }

    //* Rutas
    private router = () => {
        this.app.use(this.routes);
    }

    //* Escuchar puerto
    public listen = () => {
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${ this.port }`);
        });
    }
}