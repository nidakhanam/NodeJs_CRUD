var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();
var express = require('express');

var router = express.Router();

router.post('/',(req,res)=>{
    var stu_id = req.body.stu_id;
    var stu_name = req.body.stu_name;
    var stu_email = req.body.stu_email;
    var stu_no = req.body.stu_no;
    
    connection.query(
        'UPDATE student SET stu_email = ?, stu_no = ? WHERE stu_name = ?',
        [stu_email, stu_no, stu_name],
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