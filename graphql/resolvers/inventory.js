const Rent = require("../../models/rent");

const { transformInventory } = require("./merge");

module.exports = {
    clientInventory: async args => {
        try {
            const inventory = {
                client: args.id,
                inventoryProducts: [],
                inventoryAccessories: [],
            }

            const rents = await Rent.find({ client: args.id }).populate("rentProducts").populate("rentAccessories");
            console.log(rents)
            for (const rent of rents) {
                console.log("===")
                console.log(rent.rentProducts)
                console.log(rent.rentAccessories)
                for (const rentProduct of rent.rentProducts) {
                    
                    console.log(rentProduct)
                    // search for rent product in inventory
                    const index = inventory.inventoryProducts.findIndex(invProduct => invProduct.product === rentProduct.product);
                    if (index > -1) {
                        //Exist in inventory
                        inventory.inventoryProducts[index].quantity += rentProduct.quantity;
                    } else {
                        //Doesn't Exist
                        inventory.inventoryProducts.push(rentProduct);
                    }
                }
                for (const rentAccessory of rent.rentAccessories) {
                    const index = inventory.inventoryAccessories.findIndex(invAccessory => invAccessory.accessory === rentAccessory.accessory);
                    if (index > -1) {
                        inventory.inventoryAccessories[index].quantity += rentAccessory.quantity;
                    } else {
                        inventory.inventoryAccessories.push(rentAccessory);
                    }
                }
            }
            return transformInventory(inventory);
        } catch (err) {
            throw err;
        }
    }
}