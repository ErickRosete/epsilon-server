const productDef = `
    type Product {
        _id: ID!
        name: String!
        quantity: Int
        imageLinks: [String]
        shortDescription: String
        description: String
        videoLink: String
        subcategories: [Subcategory]
        generic: Boolean
        codes: [String]
    }

    input ProductInput{
        name: String
        quantity: Int
        imageLinks: [String]
        shortDescription: String
        description: String
        videoLink: String
        subcategories: [ID]
        generic: Boolean
        codes: [String]
    }
`;

const productQuery = `
    products: [Product!]!
    product(id: ID!): Product!
    subcategoryProducts(id: ID!): [Product!]!
`;

const productMutation = `
    createProduct(productInput: ProductInput!): Product
    updateProduct(id: ID!, productInput: ProductInput!): Product
    deleteProduct(id: ID!): Product
`;

exports.productDef = productDef;
exports.productQuery = productQuery;
exports.productMutation = productMutation;