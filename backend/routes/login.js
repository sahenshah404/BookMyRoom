const express = require("express");
const router = express.Router();
let dbClient = require("../modules/dbConnect");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { authCheck } = require("../modules/middlewares/authCheck");



router.get("/check", authCheck, (req, res) => {
    const response = {
        authenticated: false,
        role: "unknown"
    };
    res.json(response);
});


router.post("/admin", async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const data = await db.collection("admins")
                .findOne({ userId: req.body.userId });

            if (data === null) {
                res.status(401).send("Invalid UserId");
            } else {
                bcrypt.compare(req.body.password, data.password, function (err, result) {
                    if (result === false) {
                        res.status(401).send("Invalid Password");
                    } else {

                        let payload = {
                            id: req.body.userId,
                            role: "admin"
                        }
                        var token = jwt.sign({ data: payload },
                            process.env.SECRET_KEY);

                        res.cookie("token", token, { secure: false, httpOnly: true });
                        const response = {
                            authenticated: true,
                            role: "admin"
                        }
                        res.json(response);
                    };
                });
            };
        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };
});



router.get("/logout", (req, res) => {

    res.cookie("token", "", { secure: false, httpOnly: true, maxAge: 1 })
    const response = {
        authenticated: false,
        role: "unknown"
    };
    res.json(response);
});



module.exports = router;


