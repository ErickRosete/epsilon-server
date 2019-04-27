const rentProductSchema = {
    definition: `
        type RentProduct {
            _id: ID!
            quantity: Int!
            code: String
            product: Product
        }

        input RentProductInput{
            quantity: Int
            code: String
            product: ID
        }
    `,
    query: `
        rentProducts: [RentProduct!]!
        rentProduct(id: ID!): RentProduct!
        clientRentProducts(id: ID!): [RentProduct]
    `,

    mutation: `
        createRentProduct(rentProductInput: RentProductInput!): RentProduct
        updateRentProduct(id: ID!, rentProductInput: RentProductInput!): RentProduct
        deleteRentProduct(id: ID!): RentProduct
    `,
};

module.exports = rentProductSchema;