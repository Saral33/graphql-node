import productSchema from './ProductSchema';
import userSchema from './UserSchema';

const rootSchema = `#graphql 
${productSchema}
${userSchema}


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
export default rootSchema;
