const clientDef = `
    type Client {
        _id: ID!
        name: String!
        phone: String
        email: String
        detail: String
        address: Address
    }

    input ClientInput{
        name: String
        phone: String
        email: String
        detail: String
        address: ID
    }
`;

const clientQuery = `
    clients: [Client!]!
    client(id: ID!): Client!
`;

const clientMutation = `
    createClient(clientInput: ClientInput!): Client
    updateclient(id: ID!, clientInput: ClientInput!): Client
    deleteclient(id: ID!): Client
`;

exports.clientDef = clientDef;
exports.clientQuery = clientQuery;
exports.clientMutation = clientMutation;