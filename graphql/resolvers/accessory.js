const Accessory = require("../../models/accessory");
const Product = require("../../models/product");
const RentAccessory = require("../../models/rent-accessory");

module.exports = {
    accessories: async () => {
        try {
            const accessories = await Accessory.find({ deleted: false });
            return accessories.map(accessory => {
                return { ...accessory._doc };
            });
        } catch (err) {
            throw err;
        }
    },

    accessory: async args => {
        try {
            const accessory = await Accessory.findById(args.id);
            return { ...accessory._doc };
        } catch (err) {
            throw err;
        }
    },

    accessoryByCode: async args => {
        try {
          const accessory = await Accessory.findOne({ code: args.code });
          return { ...accessory._doc };
        } catch (err) {
          throw err;
        }
      },

    createAccessory: async args => {
        const accessory = Accessory({
            ...args.accessoryInput,
            currentQuantity: args.accessoryInput.totalQuantity
        });

        try {
            const result = await accessory.save();
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },

    updateAccessory: async args => {
        try {
            let prevAccessory = await Accessory.findById(args.id);
            if (prevAccessory.totalQuantity !== args.accessoryInput.totalQuantity) {
                const currentQuantity = args.accessoryInput.totalQuantity - prevAccessory.totalQuantity + prevAccessory.currentQuantity;
                prevAccessory.currentQuantity = currentQuantity;
            }
            console.log(typeof(prevAccessory))
            console.log(prevAccessory)
            prevAccessory = { ...prevAccessory._doc, ...args.accessoryInput };
            console.log(prevAccessory)
            console.log(typeof(prevAccessory))

            // const result = await prevAccessory.save();
            const result=await Accessory.findOneAndUpdate(
                {_id:args.id},
               prevAccessory ,{new:true}
                // { new: true }
            )
            console.log(result)
            return { ...result._doc };
        } catch (err) {
            console.log(err)
            throw err;
        }
    },

    deleteAccessory: async args => {
        try {
            //Delete reference from products
            const products = await Product.find({ accessories: args.id });
            products.forEach(async product => {
                const accessoryIndex = product.accessories.findIndex(accessory => accessory === args.id)
                product.accessories.splice(accessoryIndex, 1);
                await product.save();
            });

            //Delete Accessory
            const rentAccessories = await RentAccessory.find({ accessory: args.id });
            if (rentAccessories.length > 0) {
                //Soft Delete
                const accessory = await Accessory.findById(args.id)
                accessory.deleted = true;
                const result = await accessory.save()
                return { ...result._doc };
            } else {
                //Hard Delete
                const accessory = await Accessory.findByIdAndDelete(args.id);
                return { ...accessory._doc };
            }
        } catch (err) {
            throw err;
        }
    }
};
