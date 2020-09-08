const mongodb = require('mongodb') ;

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) =>{

    MongoClient.connect(
        'mongodb+srv://merima98:merima1998@cluster0.w4ehk.mongodb.net/<dbname>?retryWrites=true&w=majority'
        )
        .then(client=>{
            console.log('Connected!');
            callback(client);
        })
        .catch(err=> console.log(err));
};

module.exports = mongoConnect;




