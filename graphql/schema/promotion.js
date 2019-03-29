const promotionDef = `
    type Promotion {
        _id: ID!
        name: String!
        imageLink: String!
        active: Boolean!
    }

    input PromotionInput{
        name: String
        imageLink: String
        active: Boolean
    }
`;

const promotionQuery = `
    promotions: [Promotion!]!
    activePromotions: [Promotion!]!
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