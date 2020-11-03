var app = require('express')();
var http = require('http').createServer(app);

console.log(process.env)
app.get('/', (req, res) => {
    console.log(req.headers);

  res.writeHead(200, {'Content-Type': 'text/plain1'});
//   res.send('<h1>Hello world</h1>');
  res.end('Hello world!!!');
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});