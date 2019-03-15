const userDef = `
    type User{
        _id: ID!
        email: String!
        password: String
        role: String!
    }

    input UserInput{
        email: String
        password: String
        role: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
        role: String!
    }
`;


const userQuery = `
    users: [User!]!
    user(id: ID!): User
    userByEmail(email:String!): User
    login(userInput: UserInput!): AuthData!
`;

const userMutation = `
    addAddress(userId:ID!,addressId:ID!): User
    createUser(userInput: UserInput!): User
    updateUser(id: ID!,userInput: UserInput): User
    updateUserPassword(id: ID!,password: String): User
`;

exports.userDef = userDef;
exports.userQuery = userQuery;
exports.userMutation = userMutation;