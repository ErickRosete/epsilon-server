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

  productByCode: async args => {
    try {
      const product = await Product.findOne({ codes: args.code });
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
    const product = Product({
      ...args.productInput,
      currentQuantity: args.productInput.totalQuantity
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
      // const prevProduct = await Product.findById(args.id);
      let prevProduct = await Product.findById(args.id);
      if (prevProduct.totalQuantity !== args.productInput.totalQuantity) {
        const currentQuantity = args.productInput.totalQuantity - prevProduct.totalQuantity + prevProduct.currentQuantity;
        prevProduct.currentQuantity = currentQuantity;
      }
      prevProduct = { ...prevProduct._doc, ...args.productInput };
      const result = await Product.findOneAndUpdate(
        { _id: args.id },
        prevProduct, { new: true }
        // { new: true }
      )
      // const result = await prevProduct.save();
      return transformProduct(result);
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async args => {
    try {
      const rentProducts = await RentProduct.find({ product: args.id });
      const productQuotations = await ProductQuotation.find({ product: args.id })

      if (rentProducts.length > 0 || productQuotations.length > 0) {
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
