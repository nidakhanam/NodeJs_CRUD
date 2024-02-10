var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();
var express = require('express');

var router = express.Router();

router.post('/', (req, res) => {
    var roll_number = req.body.roll_number;

    connection.query(
        'DELETE FROM student WHERE roll_number = ?',
        [roll_number],
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