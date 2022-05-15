const express = require("express");
const router = express.Router();

const dbClient = require("../modules/dbConnect");

router.get("/", async (req, res) => {
    
    const db = await dbClient();
    if (!db) {
        res.status(503).send("Connection to database cannot be established");
    } else {
        try {
            let imageList = []
            const hostels = await db.collection("hostels").find();
            // console.log(h);
            await hostels.forEach(element => {
                imageList.push(...element.images);
            });
            res.json(imageList);

        } catch (error) {
            dbClient("reset");
            res.status(503).send("Connection to database has been interrupted");
        }
    };

});





module.exports = router;