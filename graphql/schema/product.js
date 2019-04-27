const productDef = `
    type Product {
        _id: ID!
        name: String!
        totalQuantity: Int,
        currentQuantity: Int,
        imageLinks: [String]
        shortDescription: String
        description: String
        videoLink: String
        subcategories: [Subcategory]
        codes: [String]
        accessories: [Accessory]
    }

    input ProductInput{
        name: String
        totalQuantity: Int,
        currentQuantity: Int,
        imageLinks: [String]
        shortDescription: String
        description: String
        videoLink: String
        subcategories: [ID]
        accessories: [ID]
        codes: [String]
        deleted: Boolean
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