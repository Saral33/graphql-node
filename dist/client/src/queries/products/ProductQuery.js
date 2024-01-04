"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_PRODUCTS = void 0;
const client_1 = require("@apollo/client");
exports.GET_PRODUCTS = (0, client_1.gql) `
  query GetProducts {
    products {
      _id
      name
    }
  }
`;
