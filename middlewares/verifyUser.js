const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    console.log(process.env.JWT_SECRET_KEY)
    // get the token from header
    const token = req.header("authtoken");
    if (!token) {
        return res.status(401).json({ errors: "Please authanticate using a valid token1" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data.user;
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errors: "Please authanticate using a valid token2" });
    }
}

module.exports = verifyUser;