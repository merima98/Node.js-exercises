const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;


const app = express();

app.set('view engine', 'ejs');
app.set('views',__dirname+ '/views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const { executionAsyncResource } = require('async_hooks');
//  TO DO AFTER
//const { use } = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    // User.findByPk(1)
    // .then(user=>{
    //     req.user=user;
    //     next();
    // })
    // .catch(err=>console.log(err));
    next();
});

app.use(express.static('views'));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3500);
});



