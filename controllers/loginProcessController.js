const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }
    req.session.userId = user._id;
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
