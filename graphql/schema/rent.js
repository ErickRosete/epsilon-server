const rentSchema = {
    definition: `
        type Rent {
            _id: ID!
            startDate: String
            endDate: String
            client: Client
            rentProducts: [RentProduct]
            rentAccessories: [RentAccessory]
        }

        input RentInput{
            startDate: String
            endDate: String
            client: ID
            rentProducts: [ID]
            rentAccessories: [ID]
        }
    `,
    query: `
        rents: [Rent!]!
        rent(id: ID!): Rent!
        clientRents(id: ID!): [Rent]
    `,

    mutation: `
        createRent(rentInput: RentInput!): Rent
        updateRent(id: ID!, rentInput: RentInput!): Rent
        deleteRent(id: ID!): Rent
    `,
};

module.exports = rentSchema;