const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const mysql = require('mysql2');
const schema = require('../schema.json');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(schema);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud"
});

router.post('/', upload.single('avatar'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const validRows = [];
    const invalidRows = [];
    
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (row) => {
        row.roll_number = parseInt(row.roll_number);
        row.stu_no = parseInt(row.stu_no);

        const isValid = validate(row);
        if (isValid) {
          validRows.push(row);
        } else {
            console.log('Invalid row:', row); // Log the invalid row
      console.log('Validation errors:', validate.errors); // Log the validation errors
          invalidRows.push(row);
        }
      })
      .on('end', () => {
        if (validRows.length === 0) {
          return res.status(400).json({ error: 'No valid rows found in the CSV file' });
        }
  
        const jsonData = JSON.stringify(validRows);
  
        pool.getConnection((err, connection) => {
          if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ error: 'Database connection error' });
          }
  
          const insertQuery = 'INSERT INTO student (roll_number, stu_name, stu_email, stu_no, json_data) VALUES ?';
          const values = validRows.map(row => [row.roll_number, row.stu_name, row.stu_email, row.stu_no, jsonData]);
  
          connection.query(insertQuery, [values], (err, result) => {
            connection.release();
            if (err) {
              console.error('Error executing query:', err);
              return res.status(500).json({ error: 'Database query error' });
            }
  
            res.json({ 
              message: 'CSV file uploaded and records inserted successfully', 
              validRows: validRows.length,
              invalidRows: invalidRows.length,
              jsonData 
            });
          });
        });
      });
  });
  
module.exports = router;

