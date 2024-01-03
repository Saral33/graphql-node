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

export default userSchema;
