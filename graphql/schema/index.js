const { buildSchema } = require("graphql");

const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const { subcategoryDef, subcategoryQuery, subcategoryMutation } = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");
const { addressDef, addressQuery, addressMutation } = require("./address");
const { userDef, userQuery, userMutation } = require("./user");
const { promotionDef, promotionQuery, promotionMutation } = require("./promotion");

module.exports = buildSchema(`
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}
    ${addressDef}
    ${userDef}
    ${promotionDef}

    type RootQuery {
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
        ${addressQuery}
        ${userQuery}
        ${promotionQuery}
    }

    type RootMutation {
        ${categoryMutation}
        ${subcategoryMutation}
        ${productMutation}
        ${addressMutation}
        ${userMutation}
        ${promotionMutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
