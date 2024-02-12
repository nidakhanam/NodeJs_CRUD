var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

const { validateEmail } = require('../utils');

  const schema = require('../schema.json');

var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
  
    const isValid = ajv.validate(schema, req.body);
    if (!isValid) {
      return res.status(400).json({ error: ajv.errors });
    }
  
    const { roll_number, stu_name, stu_email, stu_no } = req.body;
  
    const isValidEmail = validateEmail(req.body.stu_email);
  if (!isValidEmail) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

    connection.query(
      'UPDATE student SET stu_name = ?, stu_email = ?, stu_no = ? WHERE roll_number = ?',
      [stu_name, stu_email, stu_no, roll_number],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ update: 'success' });
      }
    );
  });
module.exports = router;