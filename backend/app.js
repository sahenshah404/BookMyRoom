const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();


//Global MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
require('dotenv').config();

//Modules
const samslogin = require("./modules/samsLogin");

//Routing Files
const login = require("./routes/login");
const admin  = require("./routes/admin");

//Routes
app.use("/sams",samslogin);
app.use("/login",login);
app.use("/admin",admin);



app.get("/home",(req,res)=>{
    res.send("Hello worldsd");
});





app.listen(process.env.PORT || 5000, () => {
    console.log("listening to port 5000");
});