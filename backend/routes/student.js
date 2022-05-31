const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

const dbClient = require("../modules/dbConnect");
const { studentAuthCheck } = require("../modules/middlewares/authCheck");

router.get("/profile", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const data = await db
        .collection("students")
        .findOne({ userId: req.userId });

      if (data === null) {
        res.status(404).send("Data not found");
      } else {
        res.json(data);
      }
    } catch (error) {
      dbClient("reset");
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});

router.get("/hostel", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const data = await db
        .collection("students")
        .findOne({ userId: req.userId });

      if (data.myHostel) {
        if (data.myHostel.name) {
          res.json(data.myHostel);
        } else {
          res.status(204).send("Data not found");
        }
      } else {
        res.status(204).send("Data not found");
      }
    } catch (error) {
      dbClient("reset");
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});



router.get("/hostel/detail/:id", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const data = await db
        .collection("hostels")
        .findOne({ _id: ObjectId(req.params.id) });

      if (data) {
        res.json(data);
      }
      else {
        res.status(204).send("Data not found");
      }
    } catch (error) {
      dbClient("reset");
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});


router.get("/hostel/book/list", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      let remainingCount = [];
      let allHostels = [];
      const studDetails = await db.collection("students").findOne({ reg_num: req.userId });
      const studGender = studDetails.gender;
      const allHostel = await db.collection("hostels").find({ gender: studGender });
      await allHostel.forEach((hostel) => {
        allHostels.push(hostel);
      });
      for (const hostel of allHostels) {
        await db.collection("allocations")
          .countDocuments({ hostelName: hostel.name })
          .then((allocatedCount) => {
            let count = {
              id: hostel._id,
              name: hostel.name,
              count: hostel.total_capacity - allocatedCount,
              images: hostel.images
            }
            remainingCount.push(count);
          })
      }
      res.json(remainingCount);

    } catch (error) {
      dbClient("reset");
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});


router.get("/hostel/book/:Id", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  const hostelId = req.params.Id;
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      let allocations = [];
      const hostelDetails = await db.collection("hostels").findOne({ _id: ObjectId(hostelId) });
      const hostelAllocations = await db.collection("allocations").find({ hostelId: ObjectId(hostelId) });
      // console.log(hostelAllocations);
      await hostelAllocations.forEach((allocation) => {
        allocations.push(allocation);
      });
      const details = {
        hostel: hostelDetails,
        allocations: allocations
      }

      res.json(details);

    } catch (error) {
      dbClient("reset");
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});


router.post("/hostel/book", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const name = req.body.name
      const room = req.body.room
      const id = req.body.id
      const studId = req.userId;

      const studDetails = await db.collection("students").findOne({ reg_num: studId });
      const allocDetails = await db.collection("allocations").findOne({ reg_num: studId });
      const allocCount = await db.collection("allocations").countDocuments({ room_no: room });
      const hostelDetails = await db.collection("hostels").findOne({ _id: ObjectId(id) });
      if (studDetails.myHostel) {
        if (studDetails.myHostel.name) {
          res.sendStatus(202);
        }
      } else if (allocDetails) {
        res.sendStatus(202);
      }
      else if (allocCount >= hostelDetails.room_capacity) {
        res.sendStatus(204);
      } else {
        const myHostel = {
          name: hostelDetails.name,
          hostelId: ObjectId(id),
          room_no: room
        };

        const allocation = {
          hostelId: ObjectId(id),
          hostelName: name,
          reg_num: studId,
          studName: studDetails.name,
          room_no: room,
          course: studDetails.course,
          department: studDetails.department

        }
        await db.collection("students").updateOne({ reg_num: studId }, { $set: { "myHostel": myHostel } });
        await db.collection("allocations").insertOne(allocation);
        await db.collection("allocationArchives").insertOne(allocation);
        res.send();
      }

    } catch (error) {
      dbClient("reset");
      console.log(error);
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});


module.exports = router;
