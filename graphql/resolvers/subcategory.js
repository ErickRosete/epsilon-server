const Subcategory = require("../../models/subcategory");
const Product = require("../../models/product");

module.exports = {
  subcategories: async () => {
    try {
      const subcategories = await Subcategory.find();
      return subcategories.map(subcategory => {
        return { ...subcategory._doc };
      });
    } catch (err) {
      throw err;
    }
  },

  subcategory: async (args) => {
    try {
      const subcategory = await Subcategory.findById(args.id);
      return { ...subcategory._doc };
    } catch (err) {
      throw err;
    }
  },

  createSubcategory: async (args) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const subcategory = Subcategory({
      ...args.subcategoryInput
    });

    try {
      const result = await subcategory.save();
      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },

  updateSubcategory: async (args) => {
    try {
      const subcategory = await Subcategory.findByIdAndUpdate(args.id,
        { ...args.subcategoryInput },
        { new: true });
      return { ...subcategory._doc };
    } catch (err) {
      throw err;
    }
  },

  deleteSubcategory: async (args) => {
    try {
      //Delete reference from products
      const products = await Product.find({ subcategories: args.id });
      products.forEach(async product => {
        const subcategoryIndex = product.subcategories.findIndex(subcategory => subcategory === args.id)
        product.subcategories.splice(subcategoryIndex, 1);
        await product.save();
      });

      //Delete Subcategory
      const subcategory = await Subcategory.findByIdAndDelete(args.id);
      return { ...subcategory._doc };
    } catch (err) {
      throw err;
    }
  }
};
