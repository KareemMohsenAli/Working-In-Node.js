import { Op } from "sequelize";
import productModel from "../../../../DB/productModel.js";
import userModel from "../../../../DB/userModel.js";
import { sequelize } from "../../../../DB/dbConnection.js";
const getProduct = async (req, res) => {
  const users = await productModel.findAll();
  res.json({ message: "done", users });
};

const addProduct = async (req, res) => {
  try {
    const { UserId } = req.params;
    console.log(UserId);
    const checkUserExists = await userModel.findOne({
      where: {
        id: UserId,
      },
    });
    console.log(checkUserExists);
    if (!checkUserExists) {
      return res.json({
        message:
          "user doesnt exist and cant add product without user in the system",
      });
    }
    const addProductQuery = await productModel.create(
      {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productCategory: req.body.productCategory,
        UserId: UserId,
      },
      {
        fields: [
          "productName",
          "productPrice",
          "productDescription",
          "productCategory",
          "UserId",
        ],
      }
    );
    return res.json({ message: "product added", addProductQuery });
  } catch (error) {
    res.json({ error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    console.log(productId, userId);
    const product = await productModel.findOne({
      where: {
        [Op.and]: [{ id: productId }, { userId: userId }],
      },
    });
    if (!product) {
      return res.json({
        message: "Product not found or you are not the owner.",
      });
    }
    await product.destroy();
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.json({ error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId, userId } = req.params;
    console.log(productId, userId);
    const product = await productModel.findOne({
      where: { [Op.and]: [{ id: productId }, { userId: userId }] },
    });
    if (!product) {
      return res.json({
        message: "Product not found or you are not the owner.",
      });
    }
    await product.update(req.body);
    res.json({ message: "Product is successfully updated!!." });
  } catch (error) {
    res.json({ error });
  }
};

const searchForProductsBiggerThan3000 = async (req, res) => {
  try {
    const products = await productModel.findAll({
      where: {
        productPrice: { [Op.gt]: 3000 },
      },
    });
    if (products.length > 0) {
      return res.json({ message: "done", products });
    } else {
      res.json({ message: "search result doesnt exist" });
    }
  } catch (error) {
    res.json(error);
  }
};

const getAllProductsWithOwners = async (req,res) => {
  try {
    const products = await productModel.findAll({
      include: {
        model: userModel,
        attributes: ['id', 'userName', 'email'], // Specify the attributes you want to include from the User model
      },
    });
    return res.json(products)
  } catch (error) {
    return res.json(error)
  }
};

const getAverageProductPrice = async (req,res) => {
  try {
    const result = await productModel.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('productPrice')), 'averagePrice'],
      ],
    });
    const averagePrice = result.getDataValue('averagePrice');
    return res.json({PriceAverage:averagePrice})
  } catch (error) {
    throw error;
  }
};

export {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  searchForProductsBiggerThan3000,
  getAllProductsWithOwners,
  getAverageProductPrice
};
