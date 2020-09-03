const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
 );


module.exports = class Cart{
    static addProduct(id,productPrice){
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent)=>{
            
            let cart = {products: [], totalPrice: 0};
            if(!err){
               cart= JSON.parse(fileContent) ;
            }
            //Analyze the cart => Find existing product
            const existingProductIndex= cart.products.findIndex(prod=>prod.id===id);
            const existingProduct = cart.products[existingProductIndex];
            let updatetProduct;
            //Add new product/ increace quantity
            if(existingProduct){
                updatetProduct = {...existingProduct};
                updatetProduct.qty= updatetProduct.qty+1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatetProduct;
            }
            else{
                updatetProduct= {id: id, qty:1};
                cart.products= [...cart.products,updatetProduct];

            }
            cart.totalPrice = cart.totalPrice + + productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log(err);
            });
        });
        
    }
}