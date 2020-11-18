const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

let _db 

const mongoConnect = callback => {
    mongoClient.connect('mongodb+srv://user:usershop@cluster0.itwlf.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log("Connected!!!")
        _db = client.db()
        callback(client)
    })
    .catch(err =>{
        console.log(err)
        throw err
    })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw "No database found!"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb

