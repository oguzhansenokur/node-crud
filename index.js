const express = require('express');
const path = require('path');
const ejs = require('ejs');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(fileUpload());

const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database');
// Template Engine
app.set('view engine', 'ejs');
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/post/:id', async (req, res) => {
  const blogPost = await BlogPost.find({ _id: req.params.id });
  res.render('post', { blogPost });
});
app.get('/create', (req, res) => {
  res.render('create');
});
app.post('/posts/store', async (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
    await BlogPost.create({
      ...req.body,
      image: `/img/${image.name}`,
    });
    res.redirect('/');
  });
});
app.get('/', async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.render('index', { blogPosts });
});
// Routing }

app.listen(3006, () => {
  console.log('App listening on port 3006');
});
