const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quotationSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    productQuotations: [{
        type: Schema.Types.ObjectId,
        ref: "ProductQuotation"
    }]
},
    { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);
