const productSchema = `#graphql
    type Product {
        _id: String!
        name: String!
        description:String!
        createdBy: User!
    }

    
`;

export default productSchema;
