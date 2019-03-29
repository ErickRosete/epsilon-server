const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: String,
        email: String,
        detail: String,
        address:
        {
            type: Schema.Types.ObjectId,
            ref: "Address"
        }
    },
);


module.exports = mongoose.model("Client", clientSchema);