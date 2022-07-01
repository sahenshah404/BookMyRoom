const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const fs = require("fs")

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
            const hostelName = await db.collection("hostels").findOne({ "name": req.body.name });
            if (hostelName) {
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

router.get("/:id", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const hostel = await db.collection("hostels").findOne({ _id: ObjectId(req.params.id) });
            const allocCount = await db.collection("allocations").countDocuments({hostelId:ObjectId(req.params.id)});
            hostel.allocCount = allocCount;
            res.json(hostel);

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.get("/remove/:id", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            const allocCount = await db.collection("allocations").countDocuments({ hostelId: ObjectId(req.params.id) });
            if(allocCount<1){

                await db.collection("hostels").findOneAndDelete({ _id: ObjectId(req.params.id) });
                res.send();
            }else{
                res.status(201).send();
            }

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.post("/edit/:id", adminAuthCheck, async (req, res) => {
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {

            // console.log(req.body);
            const data = req.body;
            delete data._id;
            data.total_capacity = data.total_room * data.room_capacity;
            const query = { _id: ObjectId(req.params.id) };
            const update = { $set: { ...data } };
            // const options = { upsert: true };
            const updated = await db.collection("hostels")
                .updateOne(query, update);


            if (updated === null) {
                res.status(503).send("server-databse error");
            } else {
                res.send();
            };

            res.send();


        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});

router.post("/edit/image/add/:id", adminAuthCheck, upload.array("images", 12), async (req, res) => {
    const db = await dbClient();

    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            // const hostelName = await db.collection("hostels").findOne({ _id: ObjectId(req.params.id) });

            let img = req.files.map(img => "/images/" + img.filename);
            await db.collection("hostels").updateOne(
                { _id: ObjectId(req.params.id) },
                { $push: { images: { $each: [...img] } } }
            );

            res.send();



        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});


router.post("/edit/image/remove", adminAuthCheck, async (req, res) => {
    const db = await dbClient();

    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            let data = req.body;
            // const hostelName = await db.collection("hostels").findOne({ _id: ObjectId(req.params.id) });

            // let img = req.files.map(img => "/images/" + img.filename);
            await db.collection("hostels").updateOne(
                { _id: ObjectId(data.hostelId) },
                { $pull: { images: data.imagePath } }
            );
            fs.unlinkSync("public" + req.body.imagePath);
            res.send();



        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});


module.exports = router;