const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
    {
        name: {
            type: String
        },
        imageLink: {
            type: String
        },
        active: Boolean,

    },
);


module.exports = mongoose.model("Promotion", promotionSchema);