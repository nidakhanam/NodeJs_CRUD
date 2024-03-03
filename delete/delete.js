var con = require('../connectdb');
var connection = con.getConnection();
connection.connect();
var express = require('express');
const Ajv = require('ajv');
const ajv = new Ajv();

// Define the JSON schema for the request body
const schema = {
  type: 'object',
  properties: {
    roll_number: { type: 'integer' }
  },
  required: ['roll_number']
};

var router = express.Router();

router.post('/', (req, res) => {
  const isValid = ajv.validate(schema, req.body);
  if (!isValid) {
    return res.status(400).json({ error: ajv.errors });
  }

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
