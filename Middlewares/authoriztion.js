const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');

const authorizeRequest = async (req, res, next) => {
    const { headers: { accesstoken } } = req;

    if (!accesstoken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ httpStatus: "Unauthorized", message: "accessToken must be passed in the header of your request" });
    }
    try {
        const decodedToken = jwt.verify(accesstoken, process.env.TOKEN_KEY);

        req.user = decodedToken;
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ httpStatus: "Unauthorized", message: "Invalid Access Token" });
    }

    return next();
}

module.exports = authorizeRequest;