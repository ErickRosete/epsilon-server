const RentAccessory = require("../../models/rent-accessory");
const Accessory = require("../../models/accessory");

const { transformRentAccessory } = require("./merge");

module.exports = {
    rentAccessories: async () => {
        try {
            const rentAccessories = await RentAccessory.find();
            return rentAccessories.map(rentAccessory => {
                return transformRentAccessory(rentAccessory);
            });
        } catch (err) {
            throw err;
        }
    },

    rentAccessory: async args => {
        try {
            const rentAccessory = await RentAccessory.findById(args.id);
            return transformRentAccessory(rentAccessory);
        } catch (err) {
            throw err;
        }
    },

    createRentAccessory: async args => {
        const rentAccessory = RentAccessory({
            ...args.rentAccessoryInput
        });

        try {
            console.log(`id ${rentAccessory.accessory} cantidad ${rentAccessory.quantity}` )
            const accessory = await Accessory.findById(rentAccessory.accessory);
            console.log(`cantidad antes del cambio: ${accessory.currentQuantity}`);
            accessory.currentQuantity-=rentAccessory.quantity;
            accessory.save();
            const result = await rentAccessory.save();
            return transformRentAccessory(result);
        } catch (err) {
            throw err;
        }
    },

    updateRentAccessory: async args => {
        try {
            const rentAccessory = await RentAccessory.findByIdAndUpdate(
                args.id,
                { ...args.rentAccessoryInput },
                { new: true }
            );
            return transformRentAccessory(rentAccessory);
        } catch (err) {
            throw err;
        }
    },

    deleteRentAccessory: async args => {
        try {
            const rentAccessory = await RentAccessory.findByIdAndDelete(args.id);
            return transformRentAccessory(rentAccessory);
        } catch (err) {
            throw err;
        }
    }
};
