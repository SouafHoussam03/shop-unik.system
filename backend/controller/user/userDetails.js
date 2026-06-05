const userModel = require("../../models/userModel")

async function userDetailsController(req, res) {
    try {
        const user = await userModel
            .findByIdAndUpdate(
                req.userId,
                {
                    lastActiveAt: new Date()
                },
                {
                    new: true
                }
            )
            .select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController