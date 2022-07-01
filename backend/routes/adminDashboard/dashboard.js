const express = require("express");
const router = express.Router();


const dbClient = require("../../modules/dbConnect");
const { adminAuthCheck } = require("../../modules/middlewares/authCheck");

//Routing file
const student = require("./students");
const hostel = require("./hostel");
const allocated = require("./allocated");
const complaint = require("./complaint")

router.get("/", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const counts = {}
            counts.hostelCount = await db.collection("hostels").count();
            counts.studentCount = await db.collection("students").count();
            counts.allocationCount = await db.collection("allocations").count();
            counts.archiveCount = await db.collection("allocationArchives").count();
            counts.complaintCount = await db.collection("complaints").count({ status: { $ne: "resolved" } });

            res.json({ counts })

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.use("/hostel", hostel);
router.use("/students", student);
router.use("/allocated", allocated);
router.use("/complaint", complaint);


module.exports = router;















