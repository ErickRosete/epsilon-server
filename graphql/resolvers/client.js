const Client = require("../../models/client");
const { transformClient } = require("./merge");


module.exports = {
    clients: async () => {
        try {
            const clients = await Client.find();
            return clients.map(client => {
                return transformClient(client);
            });
        } catch (err) {
            throw err;
        }
    },

    client: async (args, req) => {
        try {
            const clientInDB = await Client.findById(args.id);
            return transformClient(clientInDB);
        } catch (err) {
            throw err;
        }
    },

    createClient: async (args, req) => {
        try {
            const client = Client({
                ...args.clientInput,
            })
            const result = await client.save();
            return transformClient(result);
        } catch (err) {
            throw err;
        }
    },

    updateClient: async (args, req) => {
        try {
            const client = await Client.findByIdAndUpdate(
                args.id,
                { ...args.clientInput },
                { new: true }
            );
            return transformClient(client);
        } catch (err) {
            console.log(err)
            throw err;
        }
    },

    deleteClient: async args => {
        try {
            const client = await Client.findByIdAndDelete(args.id);
            return transformClient(client);
        } catch (err) {
            throw err;
        }
    }

};
