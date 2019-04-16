const Product = require("../../models/product");
const RentProduct = require("../../models/rent-product");
const ProductQuotation = require("../../models/product-quotation");

const { transformProduct } = require("./merge");

module.exports = {
  products: async () => {
    try {
      const products = await Product.find({ deleted: false });
      return products.map(product => {
        return transformProduct(product);
      });
    } catch (err) {
      throw err;
    }
  },

  product: async args => {
    try {
      const product = await Product.findById(args.id);
      return transformProduct(product);
    } catch (err) {
      throw err;
    }
  },

  subcategoryProducts: async args => {
    try {
      const products = await Product.find({ subcategories: args.id });
      return products.map(product => {
        return transformProduct(product);
      });
    } catch (err) {
      throw err;
    }
  },

  createProduct: async args => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const product = Product({
      ...args.productInput
    });

    try {
      const result = await product.save();
      return transformProduct(result);
    } catch (err) {
      throw err;
    }
  },

  updateProduct: async args => {
    try {
      const product = await Product.findByIdAndUpdate(
        args.id,
        { ...args.productInput },
        { new: true }
      );
      return transformProduct(product);
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async args => {
    try {
      const rentProducts = await RentProduct.find({ product: args.id });
      const productQuotations = await ProductQuotation.find({ product: args.id })

      if (rentProducts || productQuotations) {
        const product = await Product.findById(args.id)
        product.subcategories = null;
        product.deleted = true;
        const result = await product.save()
        return transformProduct(result);
      } else {
        const product = await Product.findByIdAndDelete(args.id);
        return transformProduct(product);
      }

    } catch (err) {
      throw err;
    }
  }
};
