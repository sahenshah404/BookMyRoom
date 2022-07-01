const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

const dbClient = require("../../modules/dbConnect");
const { adminAuthCheck } = require("../../modules/middlewares/authCheck");



router.get("/", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            let complaintList = []
            const complaint = await db.collection("complaints").find({ status: { $ne: "resolved" } });
            await complaint.forEach(element => {
                complaintList.push(element);
            });
            res.json(complaintList);

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});


router.get("/resolved/:id", adminAuthCheck, async (req, res) => {
    const db = await dbClient();

    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            await db.collection("complaints").updateOne({ _id: ObjectId(req.params.id) }, { $set: { status: "resolved" } })
            res.send();

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});



module.exports = router;