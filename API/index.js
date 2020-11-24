const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const client = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid'); 
const bcrypt = require('bcrypt');

const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

console.log('hello wolld')

let user = [
  {
    id: '',
    username: '',
    password: '', 
  }
];

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

//getting all comments from spesific topic
app.get('/comments/:postid', (req, res) => {
  client.query('SELECT * FROM comments WHERE postsid = $1', [req.params.postid]).then(results => {
    res.json(results.rows);
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

app.get('/userID/:postid', (req, res) => {
  client.query('SELECT username, picturename, joindate, bio, medals FROM users WHERE id = $1', [req.params.postid]).then(results => {
    res.json(results.rows);
    console.log(results);
  })
})

app.post('/user', (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let loggedUser = "";

  client.query('SELECT * FROM users WHERE username = $1', [username]).then(results => {
    results.rows.forEach(element =>
      bcrypt.compare(password, element.password).then(bcryptResult =>{
        if(bcryptResult == true){
          console.log("There was a match!!!!!");
          console.log(element.id);
          res.json(element.id);
        }
        else{
          console.log("There was not a match!!!!!");
        }
      })
      )

  })
});

app.post('/register', (req, res) => {
  console.log(req.body);

  let date = new Date();
  let fullDate = "";
  let fixedMonth = parseInt(date.getMonth());
  fixedMonth = fixedMonth + 1;

  fullDate = date.getDate() + "/" + fixedMonth + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();

  let username = req.body.username.trim();
  let password = req.body.password.trim();

  
  if((typeof username === "string") &&
     (username.length > 3) &&
     (typeof password === "string") &&
     (password.length > 3))
    {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        let query = 'INSERT INTO public.users(id, username, password, joindate) VALUES ($1, $2, $3, $4)';
        let values = [uuidv4(), username, hash, fullDate];
        client.query(query, values, (error, results) => {
          if (error) {
              throw error
          }
          console.log(results);
          res.status(201).send('Row added')
        })
      });
    }
    else {
      console.log("incorrect username or password, both must be strings and username more than 3 long and password more than 3 characters long");
      res.sendStatus(400);
    }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})