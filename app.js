const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');


const app = express();




app.set('view engine', 'ejs');
app.set('views',__dirname+ '/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

db.execute('SELECT * FROM products')
.then(result=>{
    console.log(result[0], result[1]);
})
.catch(err =>{
    console.log(err);
});


const { executionAsyncResource } = require('async_hooks');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//dodajem
app.use(express.static('views'));
//kraj dodavanja

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3500);
