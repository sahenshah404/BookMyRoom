const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const dbClient = require("../../modules/dbConnect")
const { adminAuthCheck } = require("../../modules/middlewares/authCheck");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });


router.post("/add", adminAuthCheck, upload.array("images", 12), async (req, res) => {
    const db = await dbClient();

    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const student = await db.collection("hostels").findOne({ "name": req.body.name });
            if (student) {
                res.sendStatus(205);
            } else {
                let data = req.body;
                data = JSON.stringify(data);
                data = JSON.parse(data);
                let img = req.files.map(img => "/images/" + img.filename);
                const hostel = data;
                hostel.images = img;
                hostel.total_capacity = data.total_room * data.room_capacity;
                await db.collection("hostels").insertOne(hostel);

                res.json();
            }


        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.get("/list", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const hostels = await db.collection("hostels").find();
            const hostelList = [];
            await hostels.forEach(element => {
                hostelList.push(element);
            });
            res.json(hostelList);

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.get("/:name", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const hostel = await db.collection("hostels").findOne({name:req.params.name});
            res.json(hostel);

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});





module.exports = router;