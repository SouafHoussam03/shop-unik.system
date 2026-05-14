const userModel = require("../../models/userModel")
const uploadProductPermission = require("../../helpers/permission")

async function deleteUserController(req, res) {
    try {
        const sessionUserId = req.userId
        const { userId } = req.body

        const hasPermission = await uploadProductPermission(sessionUserId)

        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            })
        }

        if (!userId) {
            return res.status(400).json({
                message: "User id is required",
                error: true,
                success: false
            })
        }

        if (sessionUserId === userId) {
            return res.status(400).json({
                message: "You cannot delete your own account",
                error: true,
                success: false
            })
        }

        const deletedUser = await userModel.findByIdAndDelete(userId)

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        return res.json({
            message: "User deleted successfully",
            error: false,
            success: true,
            data: deletedUser
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong",
            error: true,
            success: false
        })
    }
}

module.exports = deleteUserController
