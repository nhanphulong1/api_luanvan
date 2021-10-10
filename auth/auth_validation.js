const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            // console.log(token.slice(7));
            token = token.slice(7);
            verify(token, "qwe1234", (err, decode) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: "Invalid token!"
                    });
                } else {
                    next();
                }
            })
        } else {
            res.json({
                status: 0,
                message: "Access deniend! uunautorized user"
            });
        }
    }
}