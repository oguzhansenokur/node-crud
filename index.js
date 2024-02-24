const express = require('express');

const app = new express();
app.use(express.static('public'));
const path = require('path');

const ejs = require('ejs');

app.set('view engine', 'ejs');
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

app.listen(3006, () => {
  console.log('App listening on port 3006');
});
