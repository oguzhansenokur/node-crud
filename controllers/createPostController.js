const express = require('express');

const app = new express();
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(fileUpload());
const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, '../public/img', image.name), async (error) => {
    await BlogPost.create({
      ...req.body,
      image: `/img/${image.name}`,
    });
    res.redirect('/');
  });
};
