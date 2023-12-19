import { EnvsAdapter } from "./config";
import { Server } from "./presentation/server";
import { AppRoutes } from './presentation/routes';


(()=>{
    main();
})();


async function main(){

    const { 
        port, 
        postgres_db_name :db_name, 
        postgres_db_user: db_user, 
        postgres_db_password: db_password,
        postgres_db_port: db_port } = EnvsAdapter.envs();

    const server = new Server({ port, routes:  AppRoutes.routes(), configDB: {db_name, db_user, db_password, db_port}});

    server.listen();
}