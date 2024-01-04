"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const dbconfig_1 = require("./db/dbconfig");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const RootSchema_1 = __importDefault(require("./schemas/RootSchema"));
const Rootresolver_1 = __importDefault(require("./resolvers/Rootresolver"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const httpServer = http_1.default.createServer(app);
async function startServer() {
    (0, dbconfig_1.connectDb)();
    const server = new server_1.ApolloServer({
        typeDefs: RootSchema_1.default,
        resolvers: Rootresolver_1.default,
    });
    await server.start();
    app.use((0, cors_1.default)());
    app.use('/graphql', express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            return req;
        },
    }));
    await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:5000/`);
}
startServer();
