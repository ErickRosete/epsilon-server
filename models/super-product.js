const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const superProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    },
    imageLinks: [String],
    shortDescription: String,
    quantity: Number,
    codes: [String],
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    subcategories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subcategory"
        }
    ],
});

module.exports = mongoose.model("SuperProduct", superProductSchema);
