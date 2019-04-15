const SuperProduct = require("../../models/super-product");

const { transformSuperProduct } = require("./merge");

module.exports = {
    superProducts: async () => {
        try {
            const superProducts = await SuperProduct.find({ deleted: false });
            return superProducts.map(superProduct => {
                return transformSuperProduct(superProduct);
            });
        } catch (err) {
            throw err;
        }
    },

    superProduct: async args => {
        try {
            const superProduct = await SuperProduct.findById(args.id);
            return transformSuperProduct(superProduct);
        } catch (err) {
            throw err;
        }
    },

    subcategorySuperProducts: async args => {
        try {
            const superProducts = await SuperProduct.find({ subcategories: args.id });
            return superProducts.map(superProduct => {
                return transformSuperProduct(superProduct);
            });
        } catch (err) {
            throw err;
        }
    },

    createSuperProduct: async args => {
        const superProduct = SuperProduct({
            ...args.superProductInput
        });

        try {
            const result = await superProduct.save();
            return transformSuperProduct(result);
        } catch (err) {
            throw err;
        }
    },

    updateSuperProduct: async args => {
        try {
            const superProduct = await SuperProduct.findByIdAndUpdate(
                args.id,
                { ...args.superProductInput },
                { new: true }
            );
            return transformSuperProduct(superProduct);
        } catch (err) {
            throw err;
        }
    },


    deleteSuperProduct: async args => {
        try {
            const superProduct = await SuperProduct.findById(args.id);
            //check if superproduct is referenced and if not delete
            // const superProduct = await SuperProduct.findByIdAndDelete(args.id);
            // if it is referenced then change bool
            superProduct.deleted = true;
            const result = await superProduct.save();
            return transformSuperProduct(result);
        } catch (err) {
            throw err;
        }
    }
};
