import express from 'express';

import http from 'http';
const app = express();
import { connectDb } from './db/dbconfig';
import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';
import rootSchema from './schemas/RootSchema';
import rootResolver from './resolvers/Rootresolver';
import cors from 'cors';
require('dotenv').config();
const httpServer = http.createServer(app);

async function startServer() {
  connectDb();
  const server = new ApolloServer({
    typeDefs: rootSchema,
    resolvers: rootResolver,
  });

  await server.start();
  app.use(cors());
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return req;
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:5000/`);
}
startServer();
