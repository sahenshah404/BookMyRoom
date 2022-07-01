const express = require("express");
const router = express.Router();
const dbClient = require("../modules/dbConnect");

router.post("/issue", async (req, res) => {
    const data = req.body;

    const db = await dbClient();

    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {

            const inserted = await db.collection("contacts").insertOne(data);
            if (inserted === null) {
                res.status(503).send("server-databse error");
            } else {
                res.send();
            };

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };
})

router.post("/complaint", async (req, res) => {
    const data = req.body;

    const db = await dbClient();

    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            data.status = "complaint submitted"
            const inserted = await db.collection("complaints").insertOne(data);
            if (inserted === null) {
                res.status(503).send("server-databse error");
            } else {
                res.send();
            };

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };
})


module.exports = router;