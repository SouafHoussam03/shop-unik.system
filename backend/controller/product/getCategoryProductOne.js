const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {

    const productByCategory = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          product: { $first: "$$ROOT" } // أول منتج فكل category
        }
      },
      {
        $replaceRoot: { newRoot: "$product" }
      }
    ]);

    return res.status(200).json({
      message: "Category products fetched",
      data: productByCategory,
      success: true,
      error: false
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = getCategoryProduct;