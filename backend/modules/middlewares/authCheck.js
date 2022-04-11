const jwt = require("jsonwebtoken");


const authCheck = (req, res, next) => {

    const token = req.cookies.token;
    if (token) {

        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) {
                res.status(401).send("Invalid Cookie");
            } else {
                const response = {
                    authenticated: true,
                    role: payload.data.role
                }
                res.json(response);

            }
            // console.log(payload.data);
        })
    } else {
        next();
    }


}



const adminAuthCheck = (req, res, next) => {

    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).send("Invalid Cookie");
        } else if (payload.data.role !== "admin") {
            res.status(403).send("Not Admin");
        } else {
            next();
        }
    })


}

const studentAuthCheck = (req, res, next) => {

    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).send("Invalid Cookie");
        } else {


        }
        console.log(payload.data);
    })

    next();

}

module.exports = { authCheck, adminAuthCheck, studentAuthCheck };