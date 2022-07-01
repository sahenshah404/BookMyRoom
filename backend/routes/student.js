const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

const dbClient = require("../modules/dbConnect");
const { studentAuthCheck } = require("../modules/middlewares/authCheck");

const fs = require("fs")

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/payments')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

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


router.post("/hostel/book", studentAuthCheck, upload.array("image", 12), async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const name = req.body.name
      const room = req.body.room
      const id = req.body.id
      const studId = req.userId;
      let img = req.files.map(img => "/images/payments" + img.filename);
      const paymentId = req.body.transactionId;

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
        let dateTime = new Date();
        let dt = dateTime.toLocaleString();

        const myHostel = {
          name: hostelDetails.name,
          hostelId: ObjectId(id),
          room_no: room,
          book_date: dt
        };

        const allocation = {
          hostelId: ObjectId(id),
          hostelName: name,
          reg_num: studId,
          studName: studDetails.name,
          room_no: room,
          course: studDetails.course,
          department: studDetails.department,
          paymentId: paymentId,
          paymentImage: img,
          book_date: dt
        }

        await db.collection("students").updateOne({ reg_num: studId }, { $set: { "myHostel": myHostel } });
        const allocated = await db.collection("allocations").insertOne(allocation);
        // console.log(allocated);
        allocation.allocationId = ObjectId(allocated.insertedId);
        await db.collection("allocationArchives").insertOne(allocation);
        res.send();
      }

    } catch (error) {
      dbClient("reset");
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});

router.get("/myHostel", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const studDetails = await db.collection("students").findOne({ reg_num: req.userId });
      const myHostel = studDetails.myHostel;
      const data = await db
        .collection("hostels")
        .findOne({ _id: ObjectId(myHostel.hostelId) });

      const allocCount = await db.collection("allocations").countDocuments({ hostelId: ObjectId(myHostel.hostelId) });
      data.allocCount = allocCount
      if (data) {
        const details = {
          myHostel: myHostel,
          hostelData: data
        }
        res.json(details);
      }
      else {
        res.status(204).send("Data not found");
      }
    } catch (error) {
      dbClient("reset");
      console.log(error);
      res.status(503).send("Connection to database has been interrupted");
    }
  }
});


router.get("/hostel/leave", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const studData = await db
        .collection("students")
        .findOne({ userId: req.userId });


      if (studData.myHostel) {
        if (studData.myHostel.name) {
          const allocation = await db.collection("allocations").findOne({ reg_num: req.userId });
          const allocationId = allocation._id;
          await db.collection("allocations").deleteOne({ reg_num: req.userId });
          await db.collection("students").updateOne({ reg_num: req.userId }, { $unset: { myHostel: "" } });
          let dateTime = new Date();
          let dt = dateTime.toLocaleString();
          await db.collection("allocationArchives").updateOne({ allocationId: ObjectId(allocationId) }, { $set: { left_date: dt } })
          res.send();
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


router.post("/hostel/change/book", studentAuthCheck, async (req, res) => {
  const db = await dbClient();
  if (!db) {
    res.status(503).send("Connection to database cannot be established");
  } else {
    try {
      const studData = await db
        .collection("students")
        .findOne({ userId: req.userId });

      const allocDetails = await db.collection("allocations").findOne({ reg_num: req.userId });
      const paymentDetails = {
        paymentId: allocDetails.paymentId,
        image: allocDetails.paymentImage
      }


      if (studData.myHostel) {
        if (studData.myHostel.name) {
          await db.collection("allocations").deleteOne({ reg_num: req.userId });
          await db.collection("students").updateOne({ reg_num: req.userId }, { $unset: { myHostel: "" } }
          );

          const name = req.body.name
          const room = req.body.room
          const id = req.body.id
          const studId = req.userId;

          const allocCount = await db.collection("allocations").countDocuments({ room_no: room });
          const hostelDetails = await db.collection("hostels").findOne({ _id: ObjectId(id) });

          if (allocCount >= hostelDetails.room_capacity) {
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
              studName: studData.name,
              room_no: room,
              course: studData.course,
              department: studData.department,
              paymentId: paymentDetails.paymentId,
              paymentImage: paymentDetails.image
            }
            console.log("sdfg");
            await db.collection("students").updateOne({ reg_num: studId }, { $set: { "myHostel": myHostel } });
            await db.collection("allocations").insertOne(allocation);
            await db.collection("allocationArchives").insertOne(allocation);
            res.send();
          }
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




module.exports = router;
