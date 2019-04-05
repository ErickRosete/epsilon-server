const { buildSchema } = require("graphql");

const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const { subcategoryDef, subcategoryQuery, subcategoryMutation } = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");
const { addressDef, addressQuery, addressMutation } = require("./address");
const { userDef, userQuery, userMutation } = require("./user");
const { promotionDef, promotionQuery, promotionMutation } = require("./promotion");
const { clientDef, clientQuery, clientMutation } = require("./client");
const productQuotation = require("./product-quotation");

module.exports = buildSchema(`
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}
    ${addressDef}
    ${userDef}
    ${promotionDef}
    ${clientDef}
    ${productQuotation.definition}

    type RootQuery {
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
        ${addressQuery}
        ${userQuery}
        ${promotionQuery}
        ${clientQuery}
        ${productQuotation.query}
    }

    type RootMutation {
        ${categoryMutation}
        ${subcategoryMutation}
        ${productMutation}
        ${addressMutation}
        ${userMutation}
        ${promotionMutation}
        ${clientMutation}
        ${productQuotation.mutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
