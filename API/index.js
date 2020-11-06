const express = require('express')
const app = express()
const port = process.env.PORT || 3000
//const db = require('./db');


const { Client } = require('pg');

const client = new Client({
    user: 'wmewcoqahomuca',
    host: 'ec2-54-75-150-32.eu-west-1.compute.amazonaws.com',
    database: 'd6e4e41kp2e467',
    password: 'd82fe89addeca7db91e01a8931cf9a07a11b67f521ee50e799cb9e8526f28ac6',
    port: 5432,
    ssl: { rejectUnauthorized: false }

});


client.connect();


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