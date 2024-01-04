"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductSchema_1 = __importDefault(require("./ProductSchema"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
const rootSchema = `#graphql 
${ProductSchema_1.default}
${UserSchema_1.default}


type Query {
    products: [Product],
    product(id:String!): Product
    
}



type Mutation {
    createProduct(name: String!, description: String!): String
    registerUser(name:String!, email:String!, password:String!): String
    loginUser(email:String!, password:String!) :TLogin
   }
`;
exports.default = rootSchema;
