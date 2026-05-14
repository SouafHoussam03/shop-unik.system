const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category;

    // ✅ validation
    if (!categoryList || !Array.isArray(categoryList) || categoryList.length === 0) {
      return res.status(400).json({
        message: "Please provide category list",
        error: true,
        success: false
      });
    }

    // ✅ query
    const product = await productModel.find({
      category: { $in: categoryList }
    });

    return res.status(200).json({
      data: product,
      message: "Products fetched successfully",
      error: false,
      success: true
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = filterProductController;