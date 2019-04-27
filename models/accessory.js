const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code:String,
    deleted: {
        type: Boolean,
        required: true
    },
    totalQuantity: Number,
    currentQuantity: Number,
});

module.exports = mongoose.model("Accessory", accessorySchema);
