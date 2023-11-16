const jwt = require("jsonwebtoken")
require("dotenv").config()

const gentoken = (reguser) => {
    const jwttokn = jwt.sign({
        _id: reguser._id,
        firstname: reguser.firstname,
        lastname: reguser.lastname,
        email: reguser.email,
        password: reguser.password,
        userType: reguser.userType

    }, "queeryprivate");
    return jwttokn;
}

const middleware = (req, res, next) => {
    try {
        const token = req.headers?.authorization;
        const data = jwt.verify(token, "queeryprivate");
        if (data) {
            req.user = data;
            next();
        } else {
            res.status(401).json({ message: "Invalid token." });
        }
    } catch (e) {
        return res.status(400).json({ message: e.message, statusCode: 400 });
    }


}

// function requireAdmin(req, res, next) {
//     const authorizationtoken = req.headers.authorization;
//     if(authorization){
//         jwt.verify(
//             authorizationtoken,
//             "queeryprivate",
//             (error, decode)=>{
//                 console.log("decode value",decode)
//                 // if (req.user && req.user.isAdmin) {
//                 //     next();
//                 //   } else {
//                 //     res.status(401).send({ message: 'Invalid admin token' });
//                 //   }

//             }
//         )
//     }
//   }
module.exports = { gentoken, middleware }
