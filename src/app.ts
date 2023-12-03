import { EnvsAdapter } from "./config/envs.adapter";
import { Server } from "./presentation/server";
import { AppRoutes } from './presentation/routes';



(()=>{
    main();
})();


async function main(){

    const { port } = EnvsAdapter.envs();

    const server = new Server({ port, routes:  AppRoutes.routes()});

    server.listen();
}