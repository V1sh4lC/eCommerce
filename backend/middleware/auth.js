import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.json({success: false, message: "Not authorized log in again"})
    }

    try {
        const tokenDcrypt = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = tokenDcrypt.id
        next()

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

export default authUser