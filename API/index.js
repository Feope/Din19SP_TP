const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const client = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//getting all from picture_posts
app.get('/picture_posts', (req, res) => {
  client.query('SELECT * FROM picture_posts').then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

//getting all from users
app.get('/users', (req, res) => {
  client.query('SELECT * FROM users').then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

//getting all from comments
app.get('/comments', (req, res) => {
  client.query('SELECT * FROM comments').then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

//getting all picture_posts from spesific topic
app.get('/picture_posts/:topicid', (req, res) => {
  client.query('SELECT * FROM picture_posts WHERE topicid = $1', [req.params.topicid]).then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

//getting all from topics
app.get('/topics', (req, res) => {
  client.query('SELECT * FROM topics').then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

//getting spesific post
app.get('/post/:postid', (req, res) => {
  client.query('SELECT * FROM picture_posts WHERE id = $1', [req.params.postid]).then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})