var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();

var express = require('express');

var router = express.Router();

router.post('/',(req,res) => {
    var stu_name = req.body.stu_name;
    var stu_email = req.body.stu_email;
    var stu_no = req.body.stu_no;

    connection.query('INSERT INTO student VALUES (?, ?, ?)', [stu_name, stu_email, stu_no], (err, result)=>{
        if(err){ 
            res.send({"insert":"fail"});
        }
        else{
            res.send({"insert":"success"});
        }
    });
});

module.exports = router;