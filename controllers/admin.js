const Product = require('../models/product');
const product = require('../models/product');


exports.getAddProduct = (req,res,next)=>{ 
    res.render(
        'admin/edit-product', 
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false
        });
};

exports.postAddProduct = (req, res, next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product({
        title: title, 
        price: price, 
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
    });
    product
    .save()
    .then(result=>{
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    });
}; 

exports.getEditProduct = (req,res,next)=>{ 
    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product=>{
        if(!product){
            return res.redirect('/');
        }
        res.render(
            'admin/edit-product', 
            {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
    })
    .catch(err=>console.log(err));
  
};

exports.postEditProducts=(req, res, next)=>{

    const prodId = req.body.productId;
    const updatetTitle = req.body.title;
    const updatetPrice = req.body.price;
    const updatetImage = req.body.imageUrl;
    const updatetDesc = req.body.description;
    
    Product.findById(prodId).then(product=>{
        product.title = updatetTitle;
        product.price = updatetPrice;
        product.imageUrl= updatetImage;
        product.description = updatetDesc;
        return product.save()
    })
    .then(result=>{
        console.log('Updated product');
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
};

exports.getProducts = (req, res, next)=>{
    Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products=>{
        console.log(products);
        res.render('admin/products',{
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products', 
            layout: 'main-layout'
          });
    })
    .catch(err=>{
        console.log(err);
    }); 
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
     Product.findByIdAndRemove(prodId)
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
  };