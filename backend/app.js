const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();


//Global MiddleWare
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
require('dotenv').config();


//Modules

//Routing Files
const login = require("./routes/login");
const registration = require("./routes/registration");
const adminDashboard = require("./routes/adminDashboard/dashboard");
const student = require("./routes/student");
const contact = require("./routes/contact");
const gallery = require("./routes/gallery");

//Routes
app.use("/login", login);
app.use("/register", registration);
app.use("/admin/dashboard", adminDashboard);
app.use("/student", student);
app.use("/contact", contact);
app.use("/gallery", gallery);



app.get("/home", (req, res) => {
    res.send("Hello world");
});




app.listen(process.env.PORT || 5000, () => {
    console.log("listening to port 5000");
});