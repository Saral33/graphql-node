"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema = `#graphql
    type User {
        _id: String!
        name: String!
        # email:String!
        # password:String!
 }
 type TLogin{
    token:String
}
`;
exports.default = userSchema;
