const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    // ✅ convert to number
    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    // ✅ query
    const products = await productModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // ✅ total count
    const total = await productModel.countDocuments();

    return res.status(200).json({
      data: products,
      total,
      page,
      limit,
      message: "Products fetched successfully",
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

module.exports = getProductController;