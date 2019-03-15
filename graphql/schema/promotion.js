const promotionDef = `
    type Promotion {
        _id: ID!
        name: String!
        imageUrl: String!
        active: Boolean!
    }

    input PromotionInput{
        name: String
        imageUrl: String
        active: Boolean
    }
`;

const promotionQuery = `
    promotions: [Promotion!]!
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