const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentAccessorySchema = new Schema({
    quantity: Number,
    accessory:
    {
        type: Schema.Types.ObjectId,
        ref: "Accessory"
    }
});

module.exports = mongoose.model("RentAccessory", rentAccessorySchema);
