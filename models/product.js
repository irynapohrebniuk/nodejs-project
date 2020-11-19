const mongodb = require('mongodb')
const fs = require('fs')
const path = require('path')
const getDb = require('../util/database').getDb

const Cart = require('./cart')

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json')

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([])
        }
        cb(JSON.parse(fileContent))
    })
}

module.exports = class Product {
    constructor(id, title, description, price, imgUrl, userId) {
        this._id = id? new mongodb.ObjectID(id) : null
        this.title = title
        this.description = description
        this.price = price
        this.imgUrl = imgUrl
        this.userId = userId
    }

    save() {
        const db = getDb()
        let updatedDb
        console.log(this._id)
        if (this._id) {
            updatedDb = db
                .collection('products')
                .updateOne({ _id: this._id }, { $set: this })
            } else {
            updatedDb = db
                .collection('products')
                .insertOne(this)
        }
        return updatedDb
        .then(product => console.log("the product is updated"))
        .catch(err => console.log(err))
    }

    static deleteById(id) {
        const db = getDb()
        let updatedDb
        updatedDb = db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectID(id) })
        return updatedDb
        .then(product => console.log("the product is deleted"))
        .catch(err => console.log(err))

        // getProductsFromFile(products => {
        //     const product = products.find(prod => prod.id === id)
        //     const updatedProducts = products.filter(prod => prod.id !== id)
        //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        //         if (!err) {
        //             Cart.deleteProduct(id, product.price)
        //         }
        //     })
        // })
    }

    static fetchAll() {
        const db = getDb()
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                return products
            })
            .catch(error => console.log(error))
    }

    static findProductById(id) {
        const db = getDb()
        return db
            .collection('products')
            .find({ _id: new mongodb.ObjectID(id) })
            .next()
            .then(product => product)
            .catch(error => console.log(error))
    }
}

