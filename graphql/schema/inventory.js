const inventorySchema = {
    definition: `
        type Inventory {
            client: Client
            inventoryProducts: [InventoryProduct]
            inventoryAccessories: [InventoryAccessory]
        }

        type InventoryProduct {
            quantity: Int
            product: Product
        }

        type InventoryAccessory {
            quantity: Int
            accessory: Accessory
        }
    `,
    query: `
        clientInventory(id: ID!): Inventory!
    `,
};

module.exports = inventorySchema;