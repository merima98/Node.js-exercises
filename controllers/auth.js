const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin=(req, res, next)  =>{
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login' ,
        isAuthenticated: false
    });
};
exports.postLogin=(req, res, next)  =>{
    User.findById('5f5a9ac67e3e380ff0db05d7')
    .then(user=>{
        req.session.isLoggedIn = true;
        req.session.user=user;
        req.session.save((err)=>{
            console.log(err);
            res.redirect('/');
        });
    })
    .catch(err=>console.log(err));
};


exports.postLogout=(req, res, next)  =>{
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  };

  exports.postSignup = (req, res, next) => {
      const email  = req.body.email;
      const password  = req.body.password;
      const confirmPassword  = req.body.confirmPassword;

      User.findOne({email: email})
      .then(userDoc=>{
          if(userDoc){ //if user exists with an email in the database
            return res.redirect('/signup');
          }
          return bcrypt.hash(password,12);
      })
      .then(hashedPassword=>{
        const user = new User({
            email: email,
            password: hashedPassword,
            cart: {items: []}
        });
       return  user.save();
      })
      .then(result=>{
        res.redirect('/login');
      })
      .catch(err=>console.log(err));

  };
