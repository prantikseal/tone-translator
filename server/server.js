require('dotenv').config()
const express = require('express')
const app = express()


const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/twitter', (req, res) => {
    res.send('https://www.twitter.com/prantikseal');
})

app.get('/linkedin', (req, res) => {
    res.send('https://www.linkedin.com/in/prantikkumarseal');
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

