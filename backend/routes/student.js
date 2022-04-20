const express = require("express");
const router = express.Router();

const dbClient = require("../modules/dbConnect")
const {studentAuthCheck} = require("../modules/middlewares/authCheck");


router.get("/profile", studentAuthCheck,async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const data = await db.collection("students")
                .findOne({ userId: req.userId });

            if (data === null) {
                res.status(404).send("Data not found");
            } else {
                res.json(data)              
                
            } 

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };
});







module.exports = router;