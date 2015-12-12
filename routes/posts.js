var express = require('express'),
    User = require('../models/User'),
    Post = require('../models/Post'),
    Short = require('../models/short'),
    Objective = require('../models/Objective');

var router = express.Router();

function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      res.redirect('/signin');
    }
}


router.get('/:id/new',function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.render('posts/new', {user: user});
    });
});

router.post('/', function(req, res, next) {
  var post = new Post({
    email: req.body.email,
    password: req.body.password,
    title: req.body.title,
    content: req.body.content
  });
  console.log("제바라");
  post.save(function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/' + doc.id + '/1stobj/');
  });
});

router.get('/:id/1stobj', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post) {
      post.save(function(err) { });
      res.render('posts/1stobj', {post: post});
    }
    return next(new Error('not found'));
  });
});


router.post('/:id/obj', function(req, res, next) {
  var objective = new Objective({
    post: req.params.id,
    content: req.body.content
  });
  objective.save(function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/' + req.params.id + '/obj/');
  });
});

router.post('/:id/short', function(req, res, next) {
  var short = new Short({
    post: req.params.id,
    content: req.body.content
  });
  short.save(function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/' + req.params.id + '/short/');
  });
});

router.get('/:id/short', function(req, res, next) {
  Post.findById(req.params.id, function(err,post) {
    if (err) {
      return next(err);
    }
    Objective.find( {post: post._id}, function(err, obj) {
      if (err) {
        return next(err);
      }
      Short.find( {post: post._id}, function(err, sht) {
        if (err) {
          return next(err);
        }else{
          res.render('posts/short', { obj: obj , post: post, sht: sht});
        }
      });
    });
  });
});


router.get('/:id/1stshort', function(req, res, next) {
  Post.findById(req.params.id, function(err,post) {
    if (err) {
      return next(err);
    }
    Objective.find( {post: post._id}, function(err, obj) {
      if (err) {
        return next(err);
      }else{
        res.render('posts/1stshort', { obj: obj , post: post});
      }
    });
  });
});

router.get('/:id/obj', function(req, res, next) {
  Post.findById(req.params.id, function(err,post) {
    if (err) {
      return next(err);
    }
    Objective.find( {post: post._id}, function(err, obj) {
      if (err) {
        return next(err);
      }else if(post._id){
        res.render('posts/obj', { obj: obj , post: post});
      }
      // res.render('posts/short', { obj: obj , post: post});
    });
  });
});


router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err,post) {
    if (err) {
      return next(err);
    }
    Objective.find( {post: post._id}, function(err, obj) {
      if (err) {
        return next(err);
      }
      Short.find( {post: post._id}, function(err, sht) {
        if (err) {
          return next(err);
        }else{
          res.render('posts/show', { obj: obj , post: post, sht: sht});
        }
      });
    });
  });
});

router.get('/:id/edit', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post: post});
  });
});

router.put('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    if (req.body.password === post.password) {
      post.email = req.body.email;
      post.title = req.body.title;
      post.content = req.body.content;
      post.save(function(err) {
        req.flash('success', '수정되었습니다.');
        res.redirect('/posts/' + req.params.id);
      });
    } else {
        req.flash('danger', '비밀번호가 잘못되었습니다.');

        res.redirect('/posts/' + req.params.id + '/edit');
    }
    // res.redirect('back');
  });
});

router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts/');
  });


});


function pagination(count, page, perPage, funcUrl) {
  var pageMargin = 3;
  var firstPage = 1;
  var lastPage = Math.ceil(count / perPage);
  var prevPage = Math.max(page - 1, 1);
  var nextPage = Math.min(page + 1, lastPage);
  var pages = [];
  var startPage = Math.max(page - pageMargin, 1);
  var endPage = Math.min(startPage + (pageMargin * 2), lastPage);
  for(var i = startPage; i <= endPage; i++) {
    pages.push({
      text: i,
      cls: (page === i) ? 'active': '',
      url: funcUrl(i)
    });
  }
  return {
    numPosts: count,
    firstPage: {cls: (page === 1) ? 'disabled' : '', url: funcUrl(1)},
    prevPage: {cls: (page === 1) ? 'disabled' : '', url: funcUrl(prevPage)},
    nextPage: {cls: (page === lastPage) ? 'disabled' : '', url: funcUrl(nextPage)},
    lastPage: {cls: (page === lastPage) ? 'disabled' : '', url: funcUrl(lastPage)},
    pages: pages
  };
}
router.get('/', function(req, res, next) {
  var page = req.query.page || 1;
  page = parseInt(page, 10);
  var perPage = 10;
  Post.count(function(err, count) {
    Post.find({}).sort({createdAt: -1})
    .skip((page-1)*perPage).limit(perPage)
    .exec(function(err, posts) {
      if (err) {
        return next(err);
      }
      res.render('posts/index', {
        posts: posts,
        pagination: pagination(count, page, perPage, function(p) {
          return '/posts?page=' + p;
        })
      });
    });
  });
});






module.exports = router;
