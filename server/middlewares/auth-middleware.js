const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        //If you attempt to use and expired token, you'll receive a "401 Unauthorized HTTP" response.
        return res
            .status(401)
            .json({ message: " Unauthorized HTTP, Token not provided" });
    }

    //assuming token is in the format "Bearer <jwtToken>, removing the 'Bearer' prefix".
    const jwtToken = token.replace("Bearer", "").trim();


    try {
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);

        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: " Unauthorized HTTP, Token not provided" });
    }
};

module.exports = authMiddleware;