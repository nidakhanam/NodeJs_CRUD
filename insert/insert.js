var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);
const schema = require('../schema.json');

const { validateEmail } = require('../utils');

var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  const isValid = ajv.validate(schema, req.body);
  if (!isValid) {
    return res.status(400).json({ error: ajv.errors });
  }

  const { stu_name, stu_email, stu_no, roll_number } = req.body;
  
  const isValidEmail = validateEmail(req.body.stu_email);
  if (!isValidEmail) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  connection.query('SELECT * FROM student WHERE roll_number = ?', [roll_number], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Roll number must be unique' });
    }

    connection.query(
      'INSERT INTO student VALUES (?, ?, ?, ?)',
      [stu_name, stu_email, stu_no, roll_number],
      (err, result) => {
        if (err) { 
          res.send({"insert": "fail"});
        } else {
          res.send({"insert": "success"});
        }
      }
    );
  });
});

module.exports = router;