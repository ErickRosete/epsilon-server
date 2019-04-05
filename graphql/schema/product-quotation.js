const ProductQuotationSchema = {
    definition: `
        type ProductQuotation {
            _id: ID!
            quantity: Int!
            comment: String
            product: Product
        }

        input ProductQuotationInput{
            quantity: Int
            comment: String
            product: ID
        }
    `,
    query: `
        productQuotations: [ProductQuotation!]!
        productQuotation(id: ID!): ProductQuotation!
    `,

    mutation: `
        createProductQuotation(productQuotationInput: ProductQuotationInput!): ProductQuotation
        updateProductQuotation(id: ID!, productQuotationInput: ProductQuotationInput!): ProductQuotation
        deleteProductQuotation(id: ID!): ProductQuotation
    `,
};

module.exports = ProductQuotationSchema;