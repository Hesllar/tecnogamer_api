import express, { Router } from 'express';
import compression from 'compression';
import { PostgresDatabase, PostgresOptions } from '../data';

interface Options {
    port: number;
    routes: Router;
    configDB:PostgresOptions;
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly configDB:PostgresOptions;

    //DI
    constructor(options : Options){
        this.port = options.port;
        this.routes = options.routes;
        this.configDB = options.configDB;

        this.middleware();

        this.router();

        this.connectionDB();
    }


    //* Connection DB
    private connectionDB = async() => {
        await PostgresDatabase.connection({
            db_name:this.configDB.db_name,
            db_user:this.configDB.db_user, 
            db_password:this.configDB.db_password, 
        });
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