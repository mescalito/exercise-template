import Server from "./server";

let server = new Server();
server.SetupMiddlewares();
server.SetupRoutes();
server.Listen(5000);