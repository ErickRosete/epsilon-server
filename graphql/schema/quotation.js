const QuotationSchema = {
    definition: `
        type Quotation {
            _id: ID!
            productQuotations: [ProductQuotation]
            client: Client
        }

        input QuotationInput{
            productQuotations: [ID]
            client: ID
        }
    `,
    query: `
        quotations: [Quotation!]!
        quotation(id: ID!): Quotation!
    `,

    mutation: `
        createQuotation(quotationInput: QuotationInput!): Quotation
        updateQuotation(id: ID!, quotationInput: QuotationInput!): Quotation
        deleteQuotation(id: ID!): Quotation
    `,
};

module.exports = QuotationSchema;