var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();
var express = require('express');

var router = express.Router();

router.get('/',(req,res)=> {
    connection.query('select * from student',(err,array,feilds)=>{
        res.send(array);
    });
});

module.exports = router;