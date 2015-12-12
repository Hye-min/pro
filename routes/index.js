var express = require('express'),
<<<<<<< HEAD
    posts = require('./posts'),
=======
    todos = require('./todos'),
>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e
    User = require('../models/User');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.post('/signin', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!user) {
      req.flash('danger', '존재하지 않는 사용자 입니다.');
      res.redirect('back');
    } else if (user.password !== req.body.password) {
      req.flash('danger', '비밀번호가 일치하지 않습니다.');
      res.redirect('back');
    } else {
      req.session.user = user;
      req.flash('success', '로그인 되었습니다.');
<<<<<<< HEAD
      res.redirect('/posts');
=======
      res.redirect('/todos');
>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e
    }
  });
});

router.get('/signout', function(req, res, next) {
  delete req.session.user;
  req.flash('success', '로그아웃 되었습니다.');
  res.redirect('/');
});
<<<<<<< HEAD
router.use('/posts', posts);
=======
router.use('/todos', todos);
>>>>>>> a8297ae04afc10ed7a1b857e102b4cb557db6f3e

module.exports = router;
