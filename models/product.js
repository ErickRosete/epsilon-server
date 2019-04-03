const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageLinks: [String],
  shortDescription: String,
  quantity: Number,
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory"
    }
  ],
  generic: Boolean,
  quantity: Number,
  codes: [String],
});

module.exports = mongoose.model("Product", productSchema);
