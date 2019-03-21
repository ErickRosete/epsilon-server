const User = require("../../models/user");
const Product = require("../../models/product");
const Subcategory = require("../../models/subcategory");
const Address = require("../../models/address");
const DataLoader = require("dataloader");

const { dateToString } = require("../../helpers/date");

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

const addressLoader = new DataLoader(addressIds => {
  return getAddresses(addressIds);
});

const getAddresses = async addressIds => {
  try {
    const addresses = await Address.find({ _id: { $in: addressIds } });
    return addresses.map(address => {
      return { ...address._doc };
    });
  } catch (err) {
    throw err;
  }
};

const getAddress = async addressId => {
  try {
    return await addressLoader.load(addressId.toString());
  } catch (err) {
    throw err;
  }
};

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

const transformProduct = product => {
  return {
    ...product._doc,
    subcategories: () => subcategoryLoader.loadMany(
      product._doc.subcategories.map((subcategory) => subcategory.toString())
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

exports.transformProduct = transformProduct;
exports.transformUser = transformUser;
exports.transformCategory = transformCategory;
