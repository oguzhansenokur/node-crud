const express = require('express');

const app = new express();
app.use(express.static('public'));
const path = require('path');

const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');
// Template Engine
app.set('view engine', 'ejs');
// Routing {
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/post', (req, res) => {
  res.render('post');
});
// Routing }

app.listen(3006, () => {
  console.log('App listening on port 3006');
});
