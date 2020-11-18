const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const mongoConnect = callback => {
    mongoClient.connect('mongodb+srv://user:usershop@cluster0.itwlf.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(client => {
        console.log("Connected!!!")
        callback(client)
    })
    .catch(err =>{
        console.log(err)
    })
}

module.exports = mongoConnect

