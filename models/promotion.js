const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        imageLink: {
            type: String,
            required: true
        },
        active: Boolean,

    },
);


module.exports = mongoose.model("Promotion", promotionSchema);