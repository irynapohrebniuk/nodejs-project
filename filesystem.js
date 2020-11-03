const fs = require('fs')

fs.readFile('./text.txt', 'utf-8', (err, file) => {
    (err)? console.log(err.error) : console.log(file)
})