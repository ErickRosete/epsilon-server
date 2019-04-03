const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentProductSchema = new Schema({
    quantity: Number,
    code: String,
    product:
    {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
});

module.exports = mongoose.model("RentProduct", rentProductSchema);
