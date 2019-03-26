var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var projectsRouter = require('./routes/projects');

var app = express();

// require mongoose

var mongoose = require('mongoose');

// connect to the database

mongoose.connect('mongodb://localhost:27017/projecteer', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

// routes for users api
app.use('/users', usersRouter);
app.post('/register', usersRouter);
app.post('/login', usersRouter);
app.get('/logout', usersRouter);

// routes for tasks api
app.get('/all-tasks', tasksRouter);
app.post('/one-task', tasksRouter);
app.post('/add-new-task', tasksRouter);
app.post('/update-task', tasksRouter);
app.post('/remove-task', tasksRouter)
app.post('/delete-project-tasks', tasksRouter);

// routes for projects api
app.get('/all-projects', projectsRouter);
app.post('/one-project', projectsRouter);
app.post('/add-new-project', projectsRouter);
app.post('/update-project', projectsRouter);
app.post('/remove-project', projectsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
