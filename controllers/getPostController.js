const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  const blogPost = await BlogPost.find({ _id: req.params.id }).populate('userid');
  res.render('post', { blogPost });
};
