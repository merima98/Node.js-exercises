const Product = require('../models/product');

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
    
    const product = new Product(title, price, description, imageUrl);
    product
    .save()
    .then(result=>{
        //console.log(result);
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    });
}; 


// exports.getEditProduct = (req,res,next)=>{ 
//     const editMode = req.query.edit;
//     if(!editMode){
//         res.redirect('/');
//     }
//     const prodId = req.params.productId;
//     req.user
//     .getProducts({where:{id:prodId}})
//     // Product.findByPk(prodId)
//     .then(products=>{
//         const product = products[0];
//         if(!product){
//             return res.redirect('/');
//         }
//         res.render(
//             'admin/edit-product', 
//             {
//                 pageTitle: 'Edit Product',
//                 path: '/admin/edit-product',
//                 editing: editMode,
//                 product: product
//             });
//     })
//     .catch(err=>console.log(err));
  
// };

// exports.postEditProducts=(req, res, next)=>{

//     const prodId = req.body.productId;
//     const updatetTitle = req.body.title;
//     const updatetPrice = req.body.price;
//     const updatetImage = req.body.imageUrl;
//     const updatetDesc = req.body.description;
    
//     Product.findByPk(prodId)
//     .then(product=>{
//         product.title= updatetTitle;
//         product.price= updatetPrice;
//         product.description= updatetDesc;
//         product.imageUrl= updatetImage;
//         return product.save();
//     })
//     .then(result=>{
//         console.log('Updated product');
//         res.redirect('/admin/products');
//     })
//     .catch(err=>console.log(err));

// };

// exports.getProducts = (req, res, next)=>{
//     req.user
//     .getProducts()
//     .then(products=>{
//         res.render('admin/products',{
//             prods: products, 
//             pageTitle: 'Admin Products', 
//             path: '/admin/products', 
//             layout: 'main-layout'
//           });
//     })
//     .catch(err=>{
//         console.log(err);
//     }); 
// };

// exports.postDeleteProduct= (req, res, next)=>{
//  const prodId = req.body.productId;
//  Product.findByPk(prodId)
//     .then(product=>{
//         return product.destroy();
//     })
//     .then(result=>{
//         console.log('Destroyed product!');
//         res.redirect('/admin/products');
//     })
//     .catch(err=>console.log(err));
// };