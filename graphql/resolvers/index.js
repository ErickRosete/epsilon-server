const subcategoryResolver = require("./subcategory");
const categoryResolver = require("./category");
const productResolver = require("./product");
const userResolver = require("./user");
const promotionResolver = require("./promotion")
const clientResolver = require("./client")
const productQuotationResolver = require("./product-quotation")
const quotationResolver = require("./quotation")
const rentProductResolver = require("./rent-product");
const rentResolver = require("./rent")

const rootResolver = {
  ...categoryResolver,
  ...productResolver,
  ...subcategoryResolver,
  ...userResolver,
  ...promotionResolver,
  ...clientResolver,
  ...productQuotationResolver,
  ...quotationResolver,
  ...rentProductResolver,
  ...rentResolver
};

module.exports = rootResolver;
