const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
})

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cartProduct => {
        return cartProduct.productId.toString() === product._id.toString()
    })
    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }

    const updatedCart = { items: updatedCartItems }
    this.cart = updatedCart
    return this.save()
}

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString())
    this.cart.items = updatedCartItems
    return this.save()
}


module.exports = mongoose.model('User', userSchema)


// const mongodb = require('mongodb')
// const getDb = require('../util/database').getDb

// const ObjectId = mongodb.ObjectId

// class User {
//     constructor(id, name, email, cart) {
//         this._id = new ObjectId(id)
//         this.name = name
//         this.email = email
//         this.cart = cart
//     }

//     save() {
//         const db = getDb()
//         return db.collection('users').insertOne(this)
//     }


//     getCart() {
//         const db = getDb()
//         const productIds = this.cart.items.map(item => {
//             return item.productId
//         })
//         return db
//             .collection('products')
//             .find({ _id: { $in: productIds } })
//             .toArray()
//             .then(products => {
//                 return products.map(product => {
//                     return {
//                         ...product,
//                         quantity: this.cart.items.find(
//                             i => i.productId.toString() === product._id.toString()
//                         ).quantity
//                     }
//                 })
//             })
//     }

//     addOrder() {
//         const db = getDb()
//         return this.getCart().then(products => {
//             const order = {
//             items: products,
//             user: {
//                 _id: this._id,
//                 name: this.name
//             }
//         }
//         return db.collection('orders').insertOne(order)
//             .then(result => {
//                 this.cart = {item: []}
//                 return db
//                     .collection("users")
//                     .updateOne(
//                         { _id: this._id},
//                         { $set: { cart: { items: [] }}}
//                     )
//             })
//         })
//     }

//     getOrders() {
//         const db = getDb()
//         console.log("id: ", this._id)
//         return db
//             .collection('orders')
//             .find({'user._id': this._id})
//             .toArray()
//     }

//     static findUserById(id) {
//         const db = getDb()
//         return db
//             .collection('users')
//             .findOne({ _id: new ObjectId(id) })
//             .then(user => {
//                 console.log("findUserById(id) method: ", user)
//                 return user
//             })
//             .catch(error => console.log(error))
//     }

//     deleteProductFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString())
//         const db = getDb()
//         return db
//             .collection('users')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 { $set: { cart: { items: updatedCartItems } } }
//             )
//     }
// }

// module.exports = User