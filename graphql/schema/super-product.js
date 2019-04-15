
const superProductSchema = {
    definition: `
        type SuperProduct {
            _id: ID!
            name: String!
            description: String
            shortDescription: String
            quantity: Int
            generic: Boolean
            deleted: Boolean
            imageLinks: [String]
            codes: [String]
            products: [Product]
            subcategories: [Subcategory]
        }

        input SuperProductInput{
            name: String!
            description: String
            shortDescription: String
            quantity: Int
            generic: Boolean
            deleted: Boolean
            imageLinks: [String]
            codes: [String]
            products: [ID]
            subcategories: [ID]
        }
    `,
    query: `
        superProducts: [SuperProduct!]!
        superProduct(id: ID!): SuperProduct!
        subcategorySuperProducts(id: ID!): [SuperProduct!]!
    `,
    mutation: `
        createSuperProduct(superProductInput: SuperProductInput!): SuperProduct
        updateSuperProduct(id: ID!, superProductInput: SuperProductInput!): SuperProduct
        deleteSuperProduct(id: ID!): SuperProduct
    `,
};

module.exports = superProductSchema;