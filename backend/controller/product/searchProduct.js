const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    let { q, page = 1, limit = 10 } = req.query;

    // ✅ validation
    if (!q) {
      return res.status(400).json({
        message: "Search query is required",
        error: true,
        success: false
      });
    }

    // ✅ حماية من regex injection
    const safeQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safeQuery, "i");

    // pagination
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // query
    const product = await productModel.find({
      $or: [
        { productName: regex },
        { category: regex }
      ]
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    // total count
    const total = await productModel.countDocuments({
      $or: [
        { productName: regex },
        { category: regex }
      ]
    });

    return res.status(200).json({
      data: product,
      total,
      page,
      limit,
      message: "Search Product list",
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

module.exports = searchProduct;