const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        company: String,
        phone: String,
        address: String
    },
);


module.exports = mongoose.model("Client", clientSchema);