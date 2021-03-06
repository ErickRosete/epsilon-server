const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productQuotationSchema = new Schema({
    quantity: Number,
    comment: String,
    product:
    {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
});

module.exports = mongoose.model("ProductQuotation", productQuotationSchema);
