
const  express = require('express');

const bodyParser = require('body-parser');

const  app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true})); //running a version of Express that is 4.16+

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next)=>{

    res.status(404).send('<h1>Page not found!</h1>');
});

app.listen(3500);