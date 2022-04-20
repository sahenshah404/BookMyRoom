const express = require("express");
const router = express.Router();

const dbClient = require("../modules/dbConnect")
const {adminAuthCheck} = require("../modules/middlewares/authCheck");


router.get("/dashboard", adminAuthCheck, (req, res) => {
    const resp = {data : "data"};
    res.json(resp);
});







module.exports = router;