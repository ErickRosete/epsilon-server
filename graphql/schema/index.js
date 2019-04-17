const { buildSchema } = require("graphql");

const { categoryDef, categoryQuery, categoryMutation } = require("./category");
const { subcategoryDef, subcategoryQuery, subcategoryMutation } = require("./subcategory");
const { productDef, productQuery, productMutation } = require("./product");
const { userDef, userQuery, userMutation } = require("./user");
const { promotionDef, promotionQuery, promotionMutation } = require("./promotion");
const { clientDef, clientQuery, clientMutation } = require("./client");
const productQuotation = require("./product-quotation");
const quotation = require("./quotation");
const accessory = require("./accessory");
const rentProduct = require("./rent-product");
const rentAccessory = require("./rent-accessory");
const inventory = require("./inventory")

const rent = require("./rent")

module.exports = buildSchema(`
    ${categoryDef}
    ${subcategoryDef}
    ${productDef}
    ${userDef}
    ${promotionDef}
    ${clientDef}
    ${productQuotation.definition}
    ${quotation.definition}
    ${accessory.definition}
    ${rentAccessory.definition}
    ${rentProduct.definition}
    ${rent.definition}
    ${inventory.definition}

    type RootQuery {
        ${categoryQuery}
        ${subcategoryQuery}
        ${productQuery}
        ${userQuery}
        ${promotionQuery}
        ${clientQuery}
        ${productQuotation.query}
        ${quotation.query}
        ${accessory.query}
        ${rentAccessory.query}
        ${rentProduct.query}
        ${rent.query} 
        ${inventory.query}   
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
        ${accessory.mutation}
        ${rentAccessory.mutation}
        ${rentProduct.mutation}
        ${rent.mutation}    
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
