const accessorySchema = {
    definition: `
        type Accessory {
            name: String
            totalQuantity: Int,
            currentQuantity: Int,
        }

        input AccessoryInput {
            name: String
            totalQuantity: Int,
            currentQuantity: Int,
        }
    `,
    query: `
        accessories: [Accessory!]!
        accessory(id: ID!): Accessory!
    `,
    mutation: `
        createAccessory(accessoryInput: AccessoryInput!): Accessory
        updateAccessory(id: ID!, accessoryInput: AccessoryInput!): Accessory
        deleteAccessory(id: ID!): Accessory
    `
}

module.exports = accessorySchema;