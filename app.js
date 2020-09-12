const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views',__dirname+ '/views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


const { executionAsyncResource } = require('async_hooks');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({secret: 'my secret', resave: false, saveUninitialized: false})
);

app.use((req,res,next)=>{
    User.findById('5f5a9ac67e3e380ff0db05d7')
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>console.log(err));
});

app.use(express.static('views'));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://merima98:merima1998@cluster0.w4ehk.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
    User.findOne().then(user=>{
        if(!user){
            const user = new User({
                name: 'Merima',
                email: 'merima@gmail.com',
                cart:{
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(3500);
}).catch(err=>{
    console.log(err);
});




