const path = require('path');
const User = require('../models/User');

module.exports = (req, res) => {
  User.create({ username: req.body.username, password: req.body.password });
  res.redirect('auth/login');
};
