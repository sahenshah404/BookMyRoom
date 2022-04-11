const express = require("express");
const router = express.Router();
const agent = require('superagent').agent();
const cheerio = require("cheerio");

// https://sms.bicpu.edu.in/student/home
router.get("/login",(req,res)=>{
    (async () => {
        try {
          const resp = await agent.post('https://sms.bicpu.edu.in/student/student_login_fn')
            .send({ reg_number: '20352048', password: 'sahenshah' })
            .set('Content-Type', 'application/x-www-form-urlencoded');
        //   console.log(res.text.trim());
        if(resp.text.trim()=="Invalid Password"){
            res.send("invalid password");
        }
        else if(resp.text.trim()=="Invalid Username"){
            res.send("invalid username");
        }
        else if(resp.text.trim()=="1"){
            // res.send("successfully loggedin ");
            const r = await agent.get("https://sms.bicpu.edu.in/student/home");
            re = await r.text;
            let $ = cheerio.load(re);
            // let name = $('#username_head > a:nth-child(2)').text();
            // let name = $('#username_head > a:nth-child(2)');


            const stud_id = $('#username_head > a:nth-child(2)').attr('onclick').match(/[^a-z\_\(]\w+/)[0]
            // console.log(stud_id);
            
            const resp_data = await agent.post("https://sms.bicpu.edu.in/student/get_student_information_tab_fn/")
            .send({id : stud_id})
            .set("Content-Type" , "application/x-www-form-urlencoded")
            .set("Host","sms.bicpu.edu.in")
            .set("Origin","https://sms.bicpu.edu.in")
            .set("Referer","https://sms.bicpu.edu.in/student/home");
            
            // console.log(resp_data.text);


            //For getting the data without using post and sendin student id
            // const resp_data = await agent.get("https://sms.bicpu.edu.in/student/get_student_information_tab_fn/")
            // .set("Host","sms.bicpu.edu.in")
            // .set("Origin","https://sms.bicpu.edu.in")
            // .set("Referer","https://sms.bicpu.edu.in/student/home");


            let stud_data = JSON.parse(resp_data.text);
            console.log(stud_data);
            res.send(stud_data);
        }

        } catch (err) {
          console.error(err);
          res.send("error")
        }
      })();

});


module.exports = router

