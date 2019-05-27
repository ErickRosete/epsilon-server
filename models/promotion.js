const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
    {   title: String,
        subtitle: String,
        percentage: String,
        active: Boolean,
    },
);


module.exports = mongoose.model("Promotion", promotionSchema);