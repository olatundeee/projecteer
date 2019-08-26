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
var profileRouter = require('./routes/profile');
var tasksRouter = require('./routes/tasks');
var projectsRouter = require('./routes/projects');
var teamsRouter = require('./routes/teams');
var teamMembersRouter = require('./routes/team-members');
var taskApplicationRouter = require('./routes/task-application');
var taskDelegationRouter = require('./routes/task-delegation');
var chatRouter = require('./routes/chat');
var chatSupportRouter = require('./routes/chat-router');

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
app.post('/create-admin', usersRouter);
app.get('/all-users', usersRouter);

// routes for user profile api
app.post('/create-profile', profileRouter);
app.post('/get-profile-details', profileRouter);
app.post('/edit-profile', profileRouter);

// routes for tasks api
app.get('/all-tasks', tasksRouter);
app.post('/one-task', tasksRouter);
app.post('/get-all-user-task', tasksRouter);
app.post('/add-new-task', tasksRouter);
app.post('/update-task', tasksRouter);
app.post('/remove-task', tasksRouter)
app.post('/delete-project-tasks', tasksRouter);
app.post('/get-project-tasks', tasksRouter);

// routes for projects api
app.get('/all-projects', projectsRouter);
app.post('/one-project', projectsRouter);
app.post('/all-user-projects', projectsRouter);
app.post('/add-new-project', projectsRouter);
app.post('/update-project', projectsRouter);
app.post('/remove-project', projectsRouter);

// routes for teams api
app.get('/get-all-teams', teamsRouter);
app.post('/add-new-team', teamsRouter);
app.post('/get-user-team', teamsRouter);
app.post('/get-all-user-team', teamsRouter);
app.post('/disband-team', teamsRouter);
app.post('/delete-team-by-project', teamsRouter)

// routes for team members
app.post('/join-team', teamMembersRouter);
app.post('/confirm-team-member', teamMembersRouter);
app.post('/get-team-members', teamMembersRouter);
app.post('/delete-team-members-by-project', teamMembersRouter);

// routes for task application

app.post('/apply-for-task', taskApplicationRouter);
app.post('/confirm-user-application', taskApplicationRouter);
app.post('/get-task-applicants', taskApplicationRouter);
app.post('/get-user-applications', taskApplicationRouter);

// routes for task delegation
app.post('/delegate-task', taskDelegationRouter);
app.post('/confirm-task-delegation', taskDelegationRouter);
app.post('/find-and-remove-task-delegation', taskDelegationRouter);
app.post('/find-task-delegation', taskDelegationRouter);
app.post('/get-user-delegations', taskDelegationRouter);

// routes for user chats
app.post('/update-chat', chatRouter);
app.post('/get-user-conversations', chatSupportRouter);

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
