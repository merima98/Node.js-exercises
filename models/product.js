const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
 );

const getProductsFromFile=cb=>{
   
    fs.readFile(p, (err, fileContent)=>{
        if (err){
          return cb([]); //make sure to never execute the next line of code
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
       getProductsFromFile(products=> {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err);
            });
       });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
};