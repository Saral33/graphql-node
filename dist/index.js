"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graphql_1 = require("graphql");
const express_graphql_1 = require("express-graphql");
const app = (0, express_1.default)();
const dbconfig_1 = require("./db/dbconfig");
(0, dbconfig_1.connectDb)();
const schema = (0, graphql_1.buildSchema)(`
type Query {
  hello: String
}
`);
const root = {
    hello: () => {
        return 'Hello world!';
    },
};
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(5000, () => {
    console.log('Listening in port 5000');
});
