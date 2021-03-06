const Promotion = require("../../models/promotion");

module.exports = {
  promotions: async () => {
    try {
      const promotions = await Promotion.find();
      return promotions.map(promotion => {
        return { ...promotion._doc };
      });
    } catch (err) {
      throw err;
    }
  },

  activePromotions: async () => {
    try {
      const promotions = await Promotion.find({ active: true });
      return promotions.map(promotion => {
        return { ...promotion._doc };
      });
    } catch (err) {
      throw err;
    }
  },

  promotion: async args => {
    try {
      const promotion = await Promotion.findById(args.id);
      return { ...promotion._doc };
    } catch (err) {
      throw err;
    }
  },

  firstPromotion: async () => {
    try {
      const promotion = await Promotion.findOne();
      return { ...promotion._doc };
    } catch (err) {
      throw err;
    }
  },
  
  createPromotion: async args => {
    const promotion = Promotion({
      ...args.promotionInput
    });

    try {
      const result = await promotion.save();
      return { ...result._doc }
    } catch (err) {
      throw err;
    }
  },

  updatePromotion: async args => {
    try {
      const promotion = await Promotion.findByIdAndUpdate(
        args.id,
        { ...args.promotionInput },
        { new: true }
      );
      return { ...promotion._doc }
    } catch (err) {
      throw err;
    }
  },

  deletePromotion: async args => {
    try {
      const promotion = await Promotion.findByIdAndDelete(args.id);
      return { ...promotion._doc };
    } catch (err) {
      throw err;
    }
  }
};
