const promotionDef = `
    type Promotion {
        _id: ID!
        title: String
        subtitle: String
        percentage: String
        active: Boolean!
    }

    input PromotionInput{
        title: String
        subtitle: String
        percentage: String
        active: Boolean
    }
`;

const promotionQuery = `
    promotions: [Promotion!]!
    activePromotions: [Promotion!]!
    firstPromotion: Promotion
    promotion(id: ID!): Promotion
`;

const promotionMutation = `
    createPromotion(promotionInput: PromotionInput): Promotion
    updatePromotion(id: ID!, promotionInput: PromotionInput): Promotion
    deletePromotion(id: ID!): Promotion
`;

exports.promotionDef = promotionDef;
exports.promotionQuery = promotionQuery;
exports.promotionMutation = promotionMutation;