const express = require('express');
const ejs = require('ejs');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(fileUpload());
app.use('/posts/store', require('./middleware/validateMiddleware'));

app.use(expressSession({ secret: 'keyboard cat' }));

const mongoose = require('mongoose');
const newPostController = require('./controllers/newPost');
const aboutController = require('./controllers/aboutController');
const contactController = require('./controllers/contactController');
const getPostController = require('./controllers/getPostController');
const createPostController = require('./controllers/createPostController');
const homeController = require('./controllers/homeController');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUserController');
const loginController = require('./controllers/loginController');
const loginProcessController = require('./controllers/loginProcessController');
const authMiddleware = require('./middleware/authMiddleware');
const logoutController = require('./controllers/logoutController');

global.loggedIn = null;

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
mongoose.connect('mongodb://localhost/my_database');
// Template Engine
app.set('view engine', 'ejs');
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/post/:id', getPostController);
app.get('/create', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, createPostController);
app.get('/', homeController);
app.get('/auth/register', newUserController);
app.post('auth/register', storeUserController);
app.get('/auth/login', authMiddleware, loginController);
app.post('/auth/login', authMiddleware, loginProcessController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));
// Routing }

app.listen(3006, () => {
  console.log('App listening on port 3006');
});
