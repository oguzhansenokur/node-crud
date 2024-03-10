const User = require('../models/User');

module.exports = (req, res, next) => {
  const user = User.findById(req.session.userId);
  if (!user) {
    res.redirect('/');
  }
  next();
};
