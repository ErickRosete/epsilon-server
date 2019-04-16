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
  deleted: {
    type: Boolean,
    required: true
  },
  imageLinks: [String],
  shortDescription: String,
  totalQuantity: Number,
  currentQuantity: Number,
  codes: [String],
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory"
    }
  ],
  accessories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Accessory"
    }
  ],
});

module.exports = mongoose.model("Product", productSchema);
