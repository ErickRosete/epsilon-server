const subcategoryResolver = require("./subcategory");
const categoryResolver = require("./category");
const productResolver = require("./product");
const addressResolver = require("./address");
const userResolver = require("./user");
const promotionResolver = require("./promotion")
const clientResolver = require("./client")

const rootResolver = {
  ...categoryResolver,
  ...productResolver,
  ...subcategoryResolver,
  ...addressResolver,
  ...userResolver,
  ...promotionResolver,
  ...clientResolver
};

module.exports = rootResolver;
