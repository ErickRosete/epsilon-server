const rentAccessorySchema = {
    definition: `
        type RentAccessory {
            _id: ID!
            quantity: Int!
            accessory: Accessory
        }

        input RentAccessoryInput{
            quantity: Int
            accessory: ID
        }
    `,
    query: `
        rentAccessories: [RentAccessory!]!
        rentAccessory(id: ID!): RentAccessory!
        clientRentAccessories(id: ID!): [RentAccessory]
    `,

    mutation: `
        createRentAccessory(rentAccessoryInput: RentAccessoryInput!): RentAccessory
        updateRentAccessory(id: ID!, rentAccessoryInput: RentAccessoryInput!): RentAccessory
        deleteRentAccessory(id: ID!): RentAccessory
    `,
};

module.exports = rentAccessorySchema;