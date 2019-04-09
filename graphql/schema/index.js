const { buildSchema } = require("graphql");

const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const { subcategoryDef, subcategoryQuery, subcategoryMutation } = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");
const { userDef, userQuery, userMutation } = require("./user");
const { promotionDef, promotionQuery, promotionMutation } = require("./promotion");
const { clientDef, clientQuery, clientMutation } = require("./client");
const productQuotation = require("./product-quotation");
const quotation = require("./quotation");

module.exports = buildSchema(`
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}
    ${userDef}
    ${promotionDef}
    ${clientDef}
    ${productQuotation.definition}
    ${quotation.definition}

    type RootQuery {
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
        ${userQuery}
        ${promotionQuery}
        ${clientQuery}
        ${productQuotation.query}
        ${quotation.query}
    }

    type RootMutation {
        ${categoryMutation}
        ${subcategoryMutation}
        ${productMutation}
        ${userMutation}
        ${promotionMutation}
        ${clientMutation}
        ${productQuotation.mutation}
        ${quotation.mutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
