import { AppRoutes } from './presentation/routes';
import { EnvsAdapter } from "./config";
import { Server } from "./presentation/server";


(()=>{
    main();
})();


async function main(){
  
    const { 
        port, 
        db_name, 
        db_user, 
        db_password,
        db_port } = EnvsAdapter;

    const server = new Server({ port, routes:  AppRoutes.routes(), configDB: {db_name, db_user, db_password, db_port}});

    server.listen();
}