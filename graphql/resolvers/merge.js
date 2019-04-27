const User = require("../../models/user");
const Client = require("../../models/client")
const Product = require("../../models/product");
const Subcategory = require("../../models/subcategory");
const ProductQuotation = require("../../models/product-quotation")
const RentProduct = require("../../models/rent-product")
const RentAccessory = require("../../models/rent-accessory");
const Accessory = require("../../models/accessory")
const DataLoader = require("dataloader");

const { dateToString } = require("../../helpers/date");

//user
const userLoader = new DataLoader(userIds => {
  return getUsers(userIds);
});

const getUsers = async userIds => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    return users.map(user => {
      return transformUser(user);
    });
  } catch (err) {
    throw err;
  }
};

const getUser = async userId => {
  try {
    return await userLoader.load(userId.toString());
  } catch (err) {
    throw err;
  }
};

//client
const clientLoader = new DataLoader(clientIds => {
  return getClients(clientIds);
});

const getClients = async clientIds => {
  try {
    const clients = await Client.find({ _id: { $in: clientIds } });
    return clients.map(client => {
      return transformClient(client);
    });
  } catch (err) {

    throw err;
  }
};

const getClient = async clientId => {
  try {
    return await clientLoader.load(clientId.toString());
  } catch (err) {
    throw err;
  }
};

//product quotation
const productQuotationLoader = new DataLoader(productQuotationIds => {
  return getProductQuotations(productQuotationIds);
});

const getProductQuotations = async productQuotationIds => {
  try {
    const productQuotations = await ProductQuotation.find({ _id: { $in: productQuotationIds } });
    return productQuotations.map(productQuotation => {
      return transformProductQuotation(productQuotation);
    });
  } catch (err) {

    throw err;
  }
};

const getProductQuotation = async productQuotationId => {
  try {
    return await productQuotationLoader.load(productQuotationId.toString());
  } catch (err) {
    throw err;
  }
};


//product
const productLoader = new DataLoader(productIds => {
  return getProducts(productIds);
});

const getProducts = async productIds => {
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    return products.map(product => {
      return transformProduct(product);
    });
  } catch (err) {
    throw err;
  }
};

const getProduct = async productId => {
  try {
    return await productLoader.load(productId.toString());
  } catch (err) {
    throw err;
  }
};

//subcategory
const subcategoryLoader = new DataLoader(subcategoryIds => {
  return getSubcategories(subcategoryIds);
});

const getSubcategories = async subcategoryIds => {
  try {
    const subcategories = await Subcategory.find({
      _id: { $in: subcategoryIds }
    });
    return subcategories.map(subcategory => {
      return { ...subcategory._doc };
    });
  } catch (err) {
    throw err;
  }
};

//rent product
const rentProductLoader = new DataLoader(rentProductIds => {
  return getRentProducts(rentProductIds);
})

const getRentProducts = async rentProductIds => {
  try {
    const rentProducts = await RentProduct.find({ _id: { $in: rentProductIds } });
    return rentProducts.map(rentProduct => transformRentProduct(rentProduct));
  } catch (err) {
    throw err;
  }
};

const getRentProduct = async rentProductId => {
  try {
    return await rentProductLoader.load(rentProductId.toString());
  } catch (err) {
    throw err;
  }
}

//accessory
const accessoryLoader = new DataLoader(accessoryIds => {
  return getAccessories(accessoryIds);
})

const getAccessories = async accessoryIds => {
  try {
    const accessories = await Accessory.find({ _id: { $in: accessoryIds } });
    return accessories.map(accessory => ({ ...accessory._doc }))
  } catch (err) {
    throw err;
  }
};

const getAccessory = async accessoryId => {
  try {
    return await accessoryLoader.load(accessoryId.toString());
  } catch (err) {
    throw err;
  }
}

//rent accessory
const rentAccessoryLoader = new DataLoader(rentAccessoryIds => {
  return getRentAccessories(rentAccessoryIds);
})

const getRentAccessories = async rentAccessoryIds => {
  try {
    const rentAccessories = await RentAccessory.find({ _id: { $in: rentAccessoryIds } });
    return rentAccessories.map(rentAccessory => transformRentAccessory(rentAccessory));
  } catch (err) {
    throw err;
  }
};

const getRentAccessory = async rentAccessoryId => {
  try {
    return await rentAccessoryLoader.load(rentAccessoryId.toString());
  } catch (err) {
    throw err;
  }
}

//transform
const transformProduct = async product => {
  return {
    ...product._doc,
    subcategories: () => subcategoryLoader.loadMany(
      product._doc.subcategories.map((subcategory) => subcategory.toString())
    ),
    accessories: () => accessoryLoader.loadMany(
      product._doc.accessories.map((accesory) => accesory.toString())
    )
  };
};

const transformSuperProduct = superProduct => {
  return {
    ...superProduct._doc,
    subcategories: () => subcategoryLoader.loadMany(
      superProduct.subcategories.map((subcategory) => subcategory.toString())
    ),
    products: () => productLoader.loadMany(
      superProduct.products.map((product) => product.toString())
    )
  };
};

const transformUser = user => {
  let res = {
    ...user._doc,
    password: null,
  }
  return res
};

const transformCategory = category => {
  return {
    ...category._doc,
    subcategories: () => subcategoryLoader.loadMany(
      category._doc.subcategories.map(subcategory => subcategory.toString())
    )
  };
};

const transformClient = client => {
  return {
    ...client._doc,
  }
}

const transformProductQuotation = productQuotation => {
  return {
    ...productQuotation._doc,
    product: getProduct.bind(this, productQuotation.product)
  }
}

const transformQuotation = quotation => {
  return {
    ...quotation._doc,
    productQuotations: () => productQuotationLoader.loadMany(
      quotation.productQuotations.map(productQuotation => productQuotation.toString())),
    client: getClient.bind(this, quotation.client),
    createdAt: dateToString(quotation.createdAt),
  }
}

const transformRentProduct = rentProduct => {
  return {
    ...rentProduct._doc,
    product: getProduct.bind(this, rentProduct.product)
  }
}

const transformRentAccessory = rentAccessory => {
  return {
    ...rentAccessory._doc,
    accessory: getAccessory.bind(this, rentAccessory.accessory)
  }
}

const transformRent = rent => {
  return {
    ...rent._doc,
    startDate: dateToString(rent.startDate),
    endDate: dateToString(rent.endDate),
    client: getClient.bind(this, rent.client),
    rentProducts: () => rentProductLoader.loadMany(
      rent.rentProducts.map(rentProduct => rentProduct.toString())
    ),
    rentAccessories: () => rentAccessoryLoader.loadMany(
      rent.rentAccessories.map(rentAccessory => rentAccessory.toString())
    ),
  }
}
// inventory
const getInventoryProducts = inventoryProducts => {
  return inventoryProducts.map(inventoryProduct =>{
    return {
      ...inventoryProduct,
      product: getProduct.bind(this, inventoryProduct.product)
    }
  })
};

const getInventoryAccessories = inventoryAccessories => {
  return inventoryAccessories.map(inventoryAccessory =>{
    return {
      ...inventoryAccessory,
      accessory: getAccessory.bind(this, inventoryAccessory.accessory)
    }
  })
};

const transformInventory = inventory => {
  return {
    client: getClient.bind(this, inventory.client),
    inventoryProducts: getInventoryProducts.bind(this, inventory.inventoryProducts),
    inventoryAccessories: getInventoryAccessories.bind(this, inventory.inventoryAccessories),
  }
}

exports.transformProduct = transformProduct;
exports.transformUser = transformUser;
exports.transformCategory = transformCategory;
exports.transformClient = transformClient;
exports.transformProductQuotation = transformProductQuotation;
exports.transformQuotation = transformQuotation;
exports.transformRentProduct = transformRentProduct;
exports.transformRentAccessory = transformRentAccessory;
exports.transformRent = transformRent;
exports.transformSuperProduct = transformSuperProduct;
exports.transformInventory = transformInventory;
