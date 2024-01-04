"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productSchema = `#graphql
    type Product {
        _id: String!
        name: String!
        description:String!
        createdBy: User!
    }

    
`;
exports.default = productSchema;
