const mongoose = require('mongoose');

const BlogPostSchema = mongoose.Schema({
  title: String,
  body: String,
  datePosted: {
    type: Date,
    default: new Date(),
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: String,
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
