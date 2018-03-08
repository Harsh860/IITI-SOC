var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var User = require('./models/user');
var post = require('./models/user1');
var answer = require('./models/user2');
var multer = require('multer');
var image = require('express-image');
var shuffle = require('shuffle-array');

require('events').EventEmitter.prototype._maxListeners = 100;
var favicon = require('serve-favicon')
var path = require('path')


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var xss = require('xss');
var html = xss('<script>alert("xss");</script>');
console.log(html);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const port = process.env.PORT || 3000;



mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/quo');
require('./config/passport');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
var upload = multer({ dest: 'public/' });
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(express.static('public'));


app.use(session({
    secret: 'Thisismytestkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

function validate(req, res, next) {


    req.checkBody('fullname', 'min length of fullname is 5').isLength({ min: 5 });

    req.checkBody('password', 'min length of password is 5 ').isLength({ min: 5 });
    req.checkBody('email', 'email is required').notEmpty();

    var errors = req.validationErrors();








    if (errors) {

        var messages = [];



        errors.forEach((error) => {
            messages.push(error.msg);



        });
        req.flash('error', messages);
        res.redirect('/signup/op/op');


    } else {
        next();
    }
}
app.post('/comment/:answer/:username', function(req, res) {
    if (req.user == null) {
        res.redirect('/');
        return;
    }
    answer.findOneAndUpdate({ '_id': req.params.answer }, { $push: { commentedBy: req.params.username, comment: req.body.comment } }, function(err, data) {
        //  console.log(data);
        console.log(req.params.username);
        res.redirect('/comment/' + req.params.answer + '/' + req.params.username);
    })

})



app.get('/comment/:answer/:username', function(req, res) {
    if (req.user == null) {
      return  res.redirect('/');

    }

    console.log(req.user);
    answer.findOne({ '_id': req.params.answer }, function(err, data) {
        //  console.log(err);

        res.render('comm.ejs', { ques: data.question, ans: data.answer, data: data, user: req.params.username, ee: req.user._id });

    })

})

app.get('/signup/op/op', function(req, res, next) {
    if (req.user != null) {
      return  res.redirect('/op/' + req.user.email);
    }

    var errors = req.flash('error');
    if (req.body.fullname == undefined) {

        // console.log(1);
    }
    res.render('signup', { messages: errors });
    // res.render('sttle');
    next();

});


app.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy((err) => {
      return  res.redirect('/');
    })

});


app.get('/', function(req, res) {
  console.log(req.user);
    if (req.user != null) {
    return  res.redirect('/op/' + req.user.email);
    }

    var errors = req.flash('error');
    res.render('index', { messages: errors });
    // res.render('sttle');
  //  next();

});
app.post('/upvote/:id', function(req, res) {
    if (req.user == null) {
      return  res.redirect('/');

    }
    console.log(req.user._id);
    answer.findOneAndUpdate({ '_id': req.params.id }, { $push: { upvotedBy: req.user._id }, $inc: { count: 1 } }, function(err, data) {

        console.log(err);
        res.send(req.params.id)
        console.log(data);

    });
});

app.post('/downvote/:id', function(req, res) {
    if (req.user == null) {
      return  res.redirect('/');

    }
    answer.findOneAndUpdate({ '_id': req.params.id }, { $pull: { upvotedBy: req.user._id }, $inc: { count: -1 } }, function(err, data) {

        //  console.log(data);
        console.log(err);
        res.send(req.params.id)
    });

})

app.post(['/op/:user', '/1/op/:pa', '/all/question/:pa', '/p/op/1/:user'], function(req, res) {

    if (req.user == null) {
      return  res.redirect('/');

    }
    var ques = new post({

        question: req.body.question,
        postedBy: req.user._id
    })


    ques.save(function(error) {


            if (error) {
                throw error;
                //  post.find({})
                //    .populate('postedBy')
                //  .exec(function(error, posts) {
                // console.log(JSON.stringify(posts, null, "\t"))
                //})
            }
        })
        /* req.user.update({ $push: { question: req.body.question } }, function(err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
    });
*/
        // req.user.question = req.body.question;
        //console.log(req.user.id);
  return  res.redirect('/all/question/1');

    // console.log(req.user);
    // console.log(Userexisting);
});



app.post('/', passport.authenticate('local.signin', {
        failureRedirect: '/',
        failureFlash: true
    }),

    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
      return   res.redirect('/op/' + req.user.email);
    });



app.post('/signup/op/op', validate, passport.authenticate('local.signup', {


        failureRedirect: '/signup/op/op',
        failureFlash: true
    }),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.

    return    res.redirect('/op/' + req.user.email);

    }
);



/*app.get('/op/ans/', function(req, res) {

    console.log(req.user.email);
    res.render('ask');
})*/
app.get('/op/:user', function(req, res) {

    console.log(req.user);
    if (req.user == null) {
    return    res.redirect('/');

    }




    var itemsPerPage = 10;
    if (req.params.pa >= 2) {
        var pageNum = parseInt(req.params.pa);
    } else {
        var pageNum = 1;
    }






    answer.find({}, (err, data1) => {

        res.render('dsc', { err: req.user.fullname, ans: data1, er: req.user._id, e: req.user.email, pg: pageNum + 1, lg: pageNum - 1 });
        console.log(data1);


    }).sort('-date').skip((itemsPerPage * (pageNum - 1))).limit(itemsPerPage).populate('answeredBy')
});


app.get('/p/op/1/:user', function(req, res) {
    if (req.user == null) {
        return res.redirect('/');

    }
    if (req.params.user != null) {
        if (req.params.user != req.user.email) {
          return  res.redirect('/');
        }

    }



    var itemsPerPage = 10;
    if (req.params.pa >= 2) {
        var pageNum = parseInt(req.params.pa);
    } else {
        var pageNum = 1;
    }






    answer.find({}, (err, data1) => {

        res.render('dsc', { err: req.user.fullname, ans: data1, er: req.user._id, e: req.user.email, pg: pageNum + 1, lg: pageNum - 1 });
        console.log(data1);


    }).sort('-date').skip((itemsPerPage * (pageNum - 1))).limit(itemsPerPage).populate('answeredBy')
});

app.get('/1/op/:pa', function(req, res) {
    if (req.user == null) {
    return    res.redirect('/');

    }
    if (req.params.user != null) {
        if (req.params.user != req.user.email) {
        return     res.redirect('/');
        }

    }



    var itemsPerPage = 10;
    if (req.params.pa >= 2) {
        var pageNum = parseInt(req.params.pa);
    } else {
        var pageNum = 1;
    }






    answer.find({}, (err, data1) => {

        res.render('dsc', { err: req.user.fullname, ans: data1, er: req.user._id, e: req.user.email, pg: pageNum + 1, lg: pageNum - 1 });
        console.log(data1);


    }).sort('-date').skip((itemsPerPage * (pageNum - 1))).limit(itemsPerPage).populate('answeredBy')
});
var i = 0;
var a = [];

app.get('/qw/qw/qw/:pa', function(req, res) {

    var itemsPerPage = 10;

    var pageNum = parseInt(req.params.pa);




    answer.find({}, (err, data1) => {

        res.send(data1);

        console.log(data1);
    }).sort('-date').skip((itemsPerPage * (pageNum - 1))).limit(itemsPerPage).populate('answeredBy')


})





app.get('/all/question/:pa', function(req, res) {
    var itemsPerPage = 10;

    var pageNum = parseInt(req.params.pa);

    post.find({}, function(err, data) {
        if (pageNum === 1) {
            res.render('question', { err: req.user.fullname, err1: data, er: req.user._id, e: req.user.email });
        } else {
            res.send(data)
        }
        console.log(data);

    }).sort('-date').skip((itemsPerPage * (pageNum - 1))).limit(itemsPerPage).sort('-date').populate('postedBy')
})






app.get('/op/op/op/:id', function(req, res) {
    if (req.user == null) {
      return  res.redirect('/');

    }



    User.findOne({ '_id': req.params.id }, function(err2, data2) {

            //console.log(err2);

            answer.find({ 'answeredBy': req.params.id }, function(err1, data1) {
                //console.log(err1);
                post.find({ 'postedBy': req.params.id }, function(err, data) {
                    //   console.log(req.user.id + '  ' + 'vdxvvvvvvvvvvv');
                    // console.log(data2.id + ' ' + 'data');
                    res.render('user', { user: data2, data1: data1, data: data, idw: req.user._id });

                    //console.log(err);
                })
            })


        })
        // console.log(req.user);
});
app.post('/op/op/op/:id', upload.single('filename'), function(req, res) {
    console.log(req.params.id);
    if (req.body.bio != null) {
        User.findOneAndUpdate({ '_id': req.params.id }, { 'bio': req.body.bio }, function(err, data) {
            if (!err) {
              return  res.redirect('/op/op/op/' + req.params.id)
            }
        })

    }


    if (req.file) {


        User.findOneAndUpdate({ '_id': req.params.id }, { 'img': req.file.filename }, function(err, data) {
            if (!err) {
              return   res.redirect('/op/op/op/' + req.params.id)
            }
        })

    }
})
app.post('/delete/answer/:id', function(req, res) {

    answer.find({ _id: req.params.id }).remove(function(err, data) {

    })
    res.send({ url: '/op/op/op/' + req.user._id });
})
app.post('/op/op/op/:id1/:id2', function(req, res) {
    if (req.user == null) {
        res.redirect('/');
        return;
    }
    User.findOneAndUpdate({ _id: req.params.id1 }, { $push: { followers: req.params.id2 } }, function(err, data) {
        //    console.log(data);
        //   console.log(err);

    })



    User.findOneAndUpdate({ _id: req.params.id2 }, { $push: { following: req.params.id1 } }, function(err, data) {
        //    console.log(data);
        //  console.log(err);
    })
    res.send(req.params.id1);
})


app.post('/op/op/op1/:id1/:id2', function(req, res) {
    if (req.user == null) {
        res.redirect('/');
        return;
    }
    User.findOneAndUpdate({ _id: req.params.id1 }, { $pop: { followers: req.params.id2 } }, function(err, data) {
        //   console.log(data);
        // console.log(err);
    })



    User.findOneAndUpdate({ _id: req.params.id2 }, { $pop: { following: req.params.id1 } }, function(err, data) {

    })
    res.send(req.params.id1);
})

app.get('/:question', function(req, res) {

    console.log(req.params.question);
    console.log(encodeURIComponent(req.params.question));
    if (req.user == null) {
      return  res.redirect('/');

    }

    answer.find({ 'question': decodeURIComponent(req.params.question) }, (err, data) => {

        if (data.question == 0) {
          return  res.redirect('/');

        }


        res.render('ask', { ques: decodeURIComponent(req.params.question), data, err: req.user.fullname, er: req.user });
    }).populate('answeredBy')
})

app.post('/:question', function(req, res) {
    if (req.user == null) {
      return  res.redirect('/');

    }
    var c1 = encodeURIComponent(req.params.question);
    console.log(req.params.question);
    var ans = new answer({
        answer: req.body.question,
        question: decodeURIComponent(req.params.question),
        answeredBy: req.user._id
    })
    ans.save(function(err) {
        if (!err) {
          return  res.redirect('/' + c1);

        }
    })




})


http.listen(port, function() {
    console.log('server up');
});
