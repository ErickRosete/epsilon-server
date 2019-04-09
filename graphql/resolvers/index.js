const subcategoryResolver = require("./subcategory");
const categoryResolver = require("./category");
const productResolver = require("./product");
const userResolver = require("./user");
const promotionResolver = require("./promotion")
const clientResolver = require("./client")
const productQuotationResolver = require("./product-quotation")

const rootResolver = {
  ...categoryResolver,
  ...productResolver,
  ...subcategoryResolver,
  ...userResolver,
  ...promotionResolver,
  ...clientResolver,
  ...productQuotationResolver
};

module.exports = rootResolver;
