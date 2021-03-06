var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var mongoose   = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');

<<<<<<< HEAD

=======
>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
app.locals.moment = require('moment');

// mongodb connect
<<<<<<< HEAD
// 아래 DB접속 주소는 꼭 자기 것으로 바꾸세요!
=======
>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e
mongoose.connect('mongodb://heamin0:quddnr0@ds045511.mongolab.com:45511/heamin0');
mongoose.connection.on('error', console.log);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));
=======
>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'long-long-long-secret-string-1313513tefgwdsvbjkvasd'
}));
app.use(flash());

<<<<<<< HEAD
=======
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));
>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e

app.use(function(req, res, next) {
  res.locals.currentUser = req.session.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use('/', routes);
app.use('/users', users);
<<<<<<< HEAD
=======

>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
<<<<<<< HEAD
=======

>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
