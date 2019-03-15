const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    },
);


module.exports = mongoose.model("Promotion", promotionSchema);