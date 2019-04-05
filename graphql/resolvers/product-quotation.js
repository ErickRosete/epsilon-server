const ProductQuotation = require("../../models/product-quotation");

const { transformProductQuotation } = require("./merge");

module.exports = {
    productQuotations: async () => {
        try {
            const productQuotations = await ProductQuotation.find();
            return productQuotations.map(productQuotation => {
                return transformProductQuotation(productQuotation);
            });
        } catch (err) {
            throw err;
        }
    },

    productQuotation: async args => {
        try {
            const productQuotation = await ProductQuotation.findById(args.id);
            return transformProductQuotation(productQuotation);
        } catch (err) {
            throw err;
        }
    },

    createProductQuotation: async args => {
        const productQuotation = ProductQuotation({
            ...args.productQuotationInput
        });

        try {
            const result = await productQuotation.save();
            return transformProductQuotation(result);
        } catch (err) {
            throw err;
        }
    },

    updateProductQuotation: async args => {
        try {
            const productQuotation = await ProductQuotation.findByIdAndUpdate(
                args.id,
                { ...args.productQuotationInput },
                { new: true }
            );
            return transformProductQuotation(productQuotation);
        } catch (err) {
            throw err;
        }
    },

    deleteProductQuotation: async args => {
        try {
            const productQuotation = await ProductQuotation.findByIdAndDelete(args.id);
            return transformProductQuotation(productQuotation);
        } catch (err) {
            throw err;
        }
    }
};
