const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');


const app = express();




app.set('view engine', 'ejs');
app.set('views',__dirname+ '/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');




const { executionAsyncResource } = require('async_hooks');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//dodajem
app.use(express.static('views'));
//kraj dodavanja

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


sequelize
    .sync()
    .then(result=>{
    //console.log(result);
    app.listen(3500);
    })
    .catch(err=>console.log(err));

