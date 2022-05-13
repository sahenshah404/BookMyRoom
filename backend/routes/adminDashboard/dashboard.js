const express = require("express");
const router = express.Router();


const dbClient = require("../../modules/dbConnect");
const { adminAuthCheck } = require("../../modules/middlewares/authCheck");

//Routing file
const student = require("./students");
const hostel = require("./hostel");

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

            res.json({ counts })

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.use("/hostel", hostel);
router.use("/students", student);





module.exports = router;




// router.get("//students", adminAuthCheck, async (req, res) => {
//     const db = await dbClient();
//     if (!db) {
//         res.status(503).send("Connection to database cannot be established");
//     } else {
//         try {
//             let studentList = []
//             const students = await db.collection("students").find();
//             await students.forEach(element => {
//                 studentList.push(element);
//             });
//             res.json(studentList);

//         } catch (error) {
//             dbClient("reset");
//             res.status(503).send("Connection to database has been interrupted");
//         }
//     };

// });


// router.get("//students/:reg", adminAuthCheck, async (req, res) => {
//     const db = await dbClient();
//     const reg = req.params.reg;

//     if (!db) {
//         res.status(503).send("Connection to database cannot be established");
//     } else {
//         try {
//             const student = await db.collection("students").findOne({ "reg_num": reg });
//             res.json(student);

//         } catch (error) {
//             dbClient("reset");
//             res.status(503).send("Connection to database has been interrupted");
//         }
//     };

// });

// router.post("//addHostel", adminAuthCheck, upload.array("images", 12), async (req, res) => {
//     const db = await dbClient();

//     if (!db) {
//         res.status(503).send("Connection to database cannot be established");
//     } else {
//         try {
//             const student = await db.collection("hostels").findOne({ "name": req.body.name });
//             if (student) {
//                 res.sendStatus(205);
//             } else {
//                 let data = req.body;
//                 data = JSON.stringify(data);
//                 data = JSON.parse(data);
//                 let img = req.files.map(img => "/images/" + img.filename);
//                 const hostel = data;
//                 hostel.images = img;
//                 hostel.total_capacity = data.total_room * data.room_capacity;
//                 await db.collection("hostels").insertOne(hostel);

//                 res.json();
//             }


//         } catch (error) {
//             dbClient("reset");
//             res.status(503).send("Connection to database has been interrupted");
//         }
//     };

// });

// router.get("//hostelList", adminAuthCheck, async (req, res) => {
//     const db = await dbClient();

//     if (!db) {
//         res.status(503).send("Connection to database cannot be established");
//     } else {
//         try {
//             const hostels = await db.collection("hostels").find();
//             const hostelList = [];
//             await hostels.forEach(element => {
//                 hostelList.push(element);
//             });
//             res.json(hostelList);

//         } catch (error) {
//             dbClient("reset");
//             res.status(503).send("Connection to database has been interrupted");
//         }
//     };

// });




