var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();
var express = require('express');

var router = express.Router();

router.post('/',(req,res)=>{
    var roll_number = req.body.roll_number;
    var stu_name = req.body.stu_name;
    var stu_email = req.body.stu_email;
    var stu_no = req.body.stu_no;
    
    connection.query(
        'UPDATE student SET stu_name = ?, stu_email = ?, stu_no = ? WHERE roll_number = ?',
        [stu_name, stu_email, stu_no, roll_number],
        (err, result)=>{
        if(err){ 
            res.send({"update":"fail"});
        }
        else{
            res.send({"update":"success"});
        }
    });
});
module.exports = router;