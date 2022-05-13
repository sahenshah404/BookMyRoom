const express = require("express");
const router = express.Router();

const dbClient = require("../../modules/dbConnect");
const { adminAuthCheck } = require("../../modules/middlewares/authCheck");

router.get("/", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            let studentList = []
            const students = await db.collection("students").find();
            await students.forEach(element => {
                studentList.push(element);
            });
            res.json(studentList);

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.get("/:reg", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    const reg = req.params.reg;

    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const student = await db.collection("students").findOne({ "reg_num": reg });
            res.json(student);

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});



module.exports = router;