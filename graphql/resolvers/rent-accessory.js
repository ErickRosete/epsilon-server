const RentAccessory = require("../../models/rent-accessory");

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
