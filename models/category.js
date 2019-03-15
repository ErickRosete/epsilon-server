const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        subcategories: [{
            type: Schema.Types.ObjectId,
            ref: "Subcategory"
        }]
    },
);

module.exports = mongoose.model("Category", categorySchema);
