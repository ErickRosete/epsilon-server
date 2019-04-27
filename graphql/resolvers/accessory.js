const Accessory = require("../../models/accessory");
const Product = require("../../models/product");
const RentAccessory = require("../../models/rent-accessory");

module.exports = {
    accessories: async () => {
        try {
            const accessories = await Accessory.find({ deleted: false });
            return accessories.map(accessory => {
                return { ...accessory._doc };
            });
        } catch (err) {
            throw err;
        }
    },

    accessory: async args => {
        try {
            const accessory = await Accessory.findById(args.id);
            return { ...accessory._doc };
        } catch (err) {
            throw err;
        }
    },

    createAccessory: async args => {
        const accessory = Accessory({
            ...args.accessoryInput,
            currentQuantity: args.accessoryInput.totalQuantity
        });

        try {
            const result = await accessory.save();
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },

    updateAccessory: async args => {
        try {
            const prevAccessory = await Accessory.findById(args.id);
            if (prevAccessory.totalQuantity !== args.accessoryInput.totalQuantity) {
                const currentQuantity = args.accessoryInput.totalQuantity - prevAccessory.totalQuantity + prevAccessory.currentQuantity;
                prevAccessory.currentQuantity = currentQuantity;
            }
            prevAccessory = { ...prevAccessory._doc, ...args.accessoryInput };
            const result = await prevAccessory.save();
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },

    deleteAccessory: async args => {
        try {
            //Delete reference from products
            const products = await Product.find({ accessories: args.id });
            products.forEach(async product => {
                const accessoryIndex = product.accessories.findIndex(accessory => accessory === args.id)
                product.accessories.splice(accessoryIndex, 1);
                await product.save();
            });

            //Delete Accessory
            const rentAccessories = await RentAccessory.find({ accessory: args.id });
            if (rentAccessories.length > 0) {
                //Soft Delete
                const accessory = await Accessory.findById(args.id)
                accessory.deleted = true;
                const result = await accessory.save()
                return { ...result._doc };
            } else {
                //Hard Delete
                const accessory = await Accessory.findByIdAndDelete(args.id);
                return { ...accessory._doc };
            }
        } catch (err) {
            throw err;
        }
    }
};
