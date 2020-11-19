const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class User {
    constructor(id, name, email, cart) {
        this._id = id
        this.name = name
        this.email = email
        this.cart = cart
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id
        // })
        const updatedCart = {items: [{productId: new ObjectId(product._id), quantity: 1 }] }
        const db = getDb()
        return db
            .collection('users')
            .updateOne(
                {_id: new ObjectId(this._id)}, 
                {$set: {cart: updatedCart}}
                )
    }

    static findUserById(id) {
        const db = getDb()
        return db
            .collection('users')
            .findOne({ _id: new ObjectId(id) })
            .then(user => {
                console.log("findUserById(id) method: ", user)
                return user
            })
            .catch(error => console.log(error))
    }

    // static fetchAll() {
    //     const db = getDb()
    //     return db.collection('users')
    //         .find()
    //         .toArray()
    //         .then(users => {
    //             return users
    //         })
    //         .catch(error => console.log(error))
    // }
}

module.exports = User