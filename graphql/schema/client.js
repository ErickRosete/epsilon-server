const clientDef = `
    type Client {
        _id: ID!
        company: String
        name: String!
        phone: String
        email: String!
        address: String
    }

    input ClientInput{
        company: String
        name: String
        phone: String
        email: String
        address: String
    }
`;

const clientQuery = `
    clients: [Client!]!
    client(id: ID!): Client!
    clientByEmail(email: String): Client
`;

const clientMutation = `
    createClient(clientInput: ClientInput!): Client
    updateClient(id: ID!, clientInput: ClientInput!): Client
    deleteClient(id: ID!): Client
`;

exports.clientDef = clientDef;
exports.clientQuery = clientQuery;
exports.clientMutation = clientMutation;