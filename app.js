const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views',__dirname+ '/views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const { executionAsyncResource } = require('async_hooks');
//const { use } = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('5f57b8c4a47d4a36062d84c8')
    .then(user=>{
        req.user=new User(user.name,user.email, user.cart, user._id);
        next();
    })
    .catch(err=>console.log(err));
});

app.use(express.static('views'));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3500);
});



