const RentProduct = require("../../models/rent-product");
const Product = require("../../models/product");

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
            // console.log(rentProduct.quantity)
            // console.log(rentProduct.product)
            const product = await Product.findById(rentProduct.product);
            // console.log(product.currentQuantity)
            product.currentQuantity-=rentProduct.quantity;
            product.save();
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
