const path = require('path');

const  express = require('express');

const bodyParser = require('body-parser');

const  app = express();

app.set('view engine','pug');
app.set('views','views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true})); //running a version of Express that is 4.16+
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req, res, next)=>{

    res.status(404).render('404');
});

app.listen(3500);