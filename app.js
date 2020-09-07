const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart= require('./models/cart');
const CartItem= require('./models/cart-item');


const app = express();




app.set('view engine', 'ejs');
app.set('views',__dirname+ '/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');




const { executionAsyncResource } = require('async_hooks');
const { use } = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>console.log(err));
});



//dodajem
app.use(express.static('views'));
//kraj dodavanja

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User, {constraints: true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});





sequelize
    // .sync({force: true})
    .sync()
    .then(result=>{ 
        return User.findByPk(1);
    //console.log(result);
    })
    .then(user=>{
        if(!user){
           return  User.create({name: 'Merima', email: 'test@gmail.com'});
        }
        return user;
    })
    .then(user=>{
        // console.log(user);
        return user.createCart();
    })
    .then(cart=>{
        app.listen(3500);
    })
    .catch(err=>console.log(err));

