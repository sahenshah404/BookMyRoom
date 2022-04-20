const express = require("express");
const router = express.Router();
const dbClient = require("../modules/dbConnect");
const jwt = require("jsonwebtoken");

// const {adminAuthCheck} = require("../modules/middlewares/authCheck");
const samsCheck = require("../modules/samsCheck");
const passEncryptor = require("../modules/passEncryptor");


router.post("/student", async (req, res) => {
    // const resp = {data : "data"};
    // res.json(resp);
    // console.log(req.body);
    const response = await samsCheck(req.body.userId, req.body.password);
    if (!response.response) {
        res.status(401).send(response.data);
    }
    else {
        const data = response.data;
        const hashedPassword = await passEncryptor(req.body.password);        

        const stud_details = {
            userId: req.body.userId,
            password: hashedPassword,
            name: data.name,
            reg_num: data.reg_number,
            dob: data.dob,
            gender: data.gender,
            pumail: data.pumail,
            email: data.email,
            mobile: data.mobile,
            course: data.program_id,
            course_code: data.program_code,
            department: data.dept_id,
            student_id: data.student_id,
            hosteler: data.hosteler,
            finalized: data.finalized,
            year_joined: data.year_joined
        }

        const db = await dbClient();

        if (!db) {
            res.status(503).send("Connection to database cannot be established");
        } else {
            try {
                const query = { reg_num: data.reg_number };
                const update = { $set: { ...stud_details } };
                const options = { upsert: true };

                const updated = await db.collection("students")
                    .updateOne(query, update, options);


                if (updated === null) {
                    res.status(503).send("server-databse error");
                } else {
                    let payload = {
                        id: data.reg_number,
                        role: "student"
                    }
                    var token = jwt.sign({ data: payload },
                        process.env.SECRET_KEY);

                    res.cookie("token", token, { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 10 });
                    const response = {
                        authenticated: true,
                        role: "student"
                    }
                    res.json(response);
                };

            } catch (error) {
                dbClient("reset");
                res.status(503).send("Connection to database has been interrupted");
            }
        };
    }
});







module.exports = router;