var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();
var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT roll_number, stu_name, stu_email, stu_no FROM student', (err, array, fields) => {
        res.send(array);
    });
});

module.exports = router;