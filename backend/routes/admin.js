const express = require("express");
const router = express.Router();

const {adminAuthCheck} = require("../modules/middlewares/authCheck");


router.get("/dashboard", adminAuthCheck, (req, res) => {
    res.send("Authorized");
});







module.exports = router;