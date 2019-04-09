const Quotation = require("../../models/quotation");

const { transformQuotation } = require("./merge");

module.exports = {
  quotations: async () => {
    try {
      const quotations = await Quotation.find();
      return quotations.map(quotation => {
        return transformQuotation(quotation);
      });
    } catch (err) {
      throw err;
    }
  },

  quotation: async args => {
    try {
      const quotation = await Quotation.findById(args.id);
      return transformQuotation(quotation);
    } catch (err) {
      throw err;
    }
  },

  createQuotation: async args => {
    const quotation = Quotation({
      ...args.quotationInput
    });

    try {
      const result = await quotation.save();
      return transformQuotation(result);
    } catch (err) {
      throw err;
    }
  },

  updateQuotation: async args => {
    try {
      const quotation = await Quotation.findByIdAndUpdate(
        args.id,
        { ...args.quotationInput },
        { new: true }
      );
      return transformQuotation(quotation);
    } catch (err) {
      throw err;
    }
  },

  deleteQuotation: async args => {
    try {
      const quotation = await Quotation.findByIdAndDelete(args.id);
      return transformQuotation(quotation);
    } catch (err) {
      throw err;
    }
  }
};
