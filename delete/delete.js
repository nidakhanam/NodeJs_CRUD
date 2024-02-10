var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();
var express = require('express');

var router = express.Router();

router.post('/', (req, res) => {
    var stu_name = req.body.stu_name;

    connection.query(
        'DELETE FROM student WHERE stu_name = ?',
        [stu_name],
        (err, result) => {
            if (err) { 
                res.send({"delete": "fail"});
            } else {
                res.send({"delete": "success"});
            }
        }
    );
});

module.exports = router;