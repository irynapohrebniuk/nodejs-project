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
    constructor(id, title, description, price, imgUrl) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.imgUrl = imgUrl
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err)
                })
            } else {
                this.id = (Math.floor(Math.random()*10)).toString()
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }
        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const updatedProducts = products.filter(prod => prod.id !== id)
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
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