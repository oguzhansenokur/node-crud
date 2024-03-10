module.exports = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/'); // if user logged in, redirect to home page }
  }
  next();
};
