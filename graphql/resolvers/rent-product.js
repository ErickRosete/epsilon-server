const RentProduct = require("../../models/rent-product");

const { transformRentProduct } = require("./merge");

module.exports = {
    rentProducts: async () => {
        try {
            const rentProducts = await RentProduct.find();
            return rentProducts.map(rentProduct => {
                return transformRentProduct(rentProduct);
            });
        } catch (err) {
            throw err;
        }
    },

    rentProduct: async args => {
        try {
            const rentProduct = await RentProduct.findById(args.id);
            return transformRentProduct(rentProduct);
        } catch (err) {
            throw err;
        }
    },

    createRentProduct: async args => {
        const rentProduct = RentProduct({
            ...args.rentProductInput
        });

        try {
            const result = await rentProduct.save();
            return transformRentProduct(result);
        } catch (err) {
            throw err;
        }
    },

    updateRentProduct: async args => {
        try {
            const rentProduct = await RentProduct.findByIdAndUpdate(
                args.id,
                { ...args.rentProductInput },
                { new: true }
            );
            return transformRentProduct(rentProduct);
        } catch (err) {
            throw err;
        }
    },

    deleteRentProduct: async args => {
        try {
            const rentProduct = await RentProduct.findByIdAndDelete(args.id);
            return transformRentProduct(rentProduct);
        } catch (err) {
            throw err;
        }
    },
};
