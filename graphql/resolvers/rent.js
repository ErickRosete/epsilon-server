const Rent = require("../../models/rent");
const Client = require("../../models/client");

const { transformRent } = require("./merge");

module.exports = {
    rents: async () => {
        try {
            const rents = await Rent.find();
            return rents.map(rent => {
                return transformRent(rent);
            });
        } catch (err) {
            throw err;
        }
    },

    rent: async args => {
        try {
            const rent = await Rent.findById(args.id);
            return transformRent(rent);
        } catch (err) {
            throw err;
        }
    },

    createRent: async args => {
        const rent = Rent({
            ...args.rentInput
        });
        console.log(rent)
        const client = await Client.findById(rent.client);
        console.log(client)
        
        try {
            const result = await rent.save();
            return transformRent(result);
        } catch (err) {
            throw err;
        }
    },

    updateRent: async args => {
        try {
            const rent = await Rent.findByIdAndUpdate(
                args.id,
                { ...args.rentInput },
                { new: true }
            );
            return transformRent(rent);
        } catch (err) {
            throw err;
        }
    },

    deleteRent: async args => {
        try {
            const rent = await Rent.findByIdAndDelete(args.id);
            return transformRent(rent);
        } catch (err) {
            throw err;
        }
    }
};
