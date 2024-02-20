const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function(req, res) {
    res.send('hello there')
})

app.listen(3000)