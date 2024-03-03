require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.use('/upload', authenticateToken, require('./routes/upload')); 
app.use('/fetch', authenticateToken, require('./fetchdata/fetch'));
app.use('/insert', authenticateToken, require('./insert/insert'));
app.use('/update', authenticateToken, require('./updatedb/update'));
app.use('/delete', authenticateToken, require('./delete/delete'));

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
