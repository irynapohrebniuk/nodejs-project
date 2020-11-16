const fs = require('fs')
const path = require('path')

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
    constructor(title, description, price, imgUrl) {
        this.title = title
        this.description = description
        this.price = price
        this.imgUrl = imgUrl
    }

    save() {
        this.id = Math.random().toString()
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }
    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findProductById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            cb(product)
        })
    }
}