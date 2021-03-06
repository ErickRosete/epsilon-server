const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentSchema = new Schema({
    startDate: Date,
    endDate: Date,
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    rentProducts: [
        {
            type: Schema.Types.ObjectId,
            ref: "RentProduct"
        }
    ],
    rentAccessories: [
        {
            type: Schema.Types.ObjectId,
            ref: "RentAccessory"
        }
    ]
});

module.exports = mongoose.model("Rent", rentSchema);
