const accessorySchema = {
    definition: `
        type Accessory {
            _id: ID!
            name: String
            code: String
            totalQuantity: Int,
            currentQuantity: Int,
            deleted: Boolean
        }

        input AccessoryInput {
            name: String
            code: String
            totalQuantity: Int,
            currentQuantity: Int,
            deleted: Boolean
        }
    `,
    query: `
        accessories: [Accessory!]!
        accessory(id: ID!): Accessory!
        accessoryByCode(code: String!): Accessory!

    `,
    mutation: `
        createAccessory(accessoryInput: AccessoryInput!): Accessory
        updateAccessory(id: ID!, accessoryInput: AccessoryInput!): Accessory
        deleteAccessory(id: ID!): Accessory
    `
}

module.exports = accessorySchema;