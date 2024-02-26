const express = require('express');
const path = require('path');
const ejs = require('ejs');
const BlogPost = require('./models/BlogPost');

const bodyParser = require('body-parser');

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');
// Template Engine
app.set('view engine', 'ejs');
// Routing {
// app.get('/', (req, res) => {
//   res.render('index');
// });
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
  await BlogPost.create(req.body);
  res.redirect('/');
});
app.get('/', async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.render('index', { blogPosts });
});
// Routing }

app.listen(3006, () => {
  console.log('App listening on port 3006');
});
