const subcategoryResolver = require("./subcategory");
const categoryResolver = require("./category");
const productResolver = require("./product");
const userResolver = require("./user");
const promotionResolver = require("./promotion")
const clientResolver = require("./client")
const productQuotationResolver = require("./product-quotation")
const quotationResolver = require("./quotation")
const superProductResolver = require("./super-product")
const rentProductResolver = require("./rent-product");
const rentResolver = require("./rent")
const rentAccessoryResolver = require("./rent-accessory");
const accessoryResolver = require("./accessory");


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
  ...rentAccessoryResolver,
  ...accessoryResolver,
  ...rentResolver,
  ...superProductResolver
};

module.exports = rootResolver;
