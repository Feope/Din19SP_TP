const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const client = require('./db');
const cors = require('cors');

app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/items', (req, res) => {
  client.query('SELECT * FROM picture_posts').then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})