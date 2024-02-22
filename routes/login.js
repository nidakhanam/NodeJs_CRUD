const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const users = [
  { id: 1, username: 'nida', password: bcrypt.hashSync('password1', 10) },
  { id: 2, username: 'adee', password: bcrypt.hashSync('password2', 10) },
];

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.json({ accessToken });
});

module.exports = router;