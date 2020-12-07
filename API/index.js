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
console.log("hello");

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
  })
})

//getting ids from picture_posts
app.get('/postids', (req, res) => {
  client.query('SELECT id FROM picture_posts').then(results => {
    const idsArray = [];
    for(i=0; i<results.rows.length; i++) {
      idsArray.push(results.rows[i].id);
    }
    res.json(idsArray);
    
  })
})

//getting all from users
app.get('/users', (req, res) => {
  client.query('SELECT * FROM users').then(results => {
    res.json(results.rows);
    
  })
})

//getting all from comments
app.get('/comments', (req, res) => {
  client.query('SELECT * FROM comments').then(results => {
    res.json(results.rows);
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
    
  })
})

//getting all from topics
app.get('/topics', (req, res) => {
  client.query('SELECT * FROM topics').then(results => {
    res.json(results.rows);
    
  })
})

//getting spesific post
app.get('/post/:postid', (req, res) => {
  client.query('SELECT * FROM picture_posts WHERE id = $1', [req.params.postid]).then(results => {
    res.json(results.rows);
    
  })
})

app.get('/userID/:postid', (req, res) => {
  client.query('SELECT username, id, picturename, joindate, bio, medals FROM users WHERE id = $1', [req.params.postid]).then(results => {
    res.json(results.rows);
    
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

app.post('/delete', (req, res) => {
  let ids = req.body.ids.trim();
  console.log(ids);
  client.query('DELETE FROM users WHERE id = $1', [ids]).then(results => {
    console.log(results);
    res.status(201).send('Row deleted!')
  });
});

app.post('/register', (req, res) => {
  console.log(req.body);

  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var fullDate = date +' '+ time ;

  let username = req.body.username.trim();
  let password = req.body.password.trim();

  client.query('SELECT * FROM users WHERE username = $1', [username]).then(results => {
    if(results.rows.length != 0){
      console.log('user exists already');
      res.sendStatus(400);
    }
    else{
      if((typeof username === "string") &&
      (username.length > 2) &&
      (typeof password === "string") &&
      (password.length > 2))
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
       res.sendStatus(411);
     }
    }
    });
})


//posting a comment
app.post('/comment', (req, res) => {
  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();
  var fullDate = date +' '+ time ;

  client.query('INSERT INTO comments(id, postsid, userid, textcomment, timedate) VALUES ($1, $2, $3, $4, $5)', 
                                    [uuidv4(), req.body.postsid, req.body.userid, req.body.textcomment, fullDate])
  .then(results => {
    res.sendStatus(201);
    console.log("comment made!");
  })
  .catch(error => res.sendStatus(500));
})

//updating likes and dislikes of a spesific post
app.put('/like', (req, res) => {
  client.query('UPDATE picture_posts SET likes = $1, dislikes = $2 WHERE id = $3', [req.body.likes, req.body.dislikes, req.body.postid])
  .then(results => {
    res.sendStatus(200);
    console.log("likes updated");
  })
  .catch(error => res.sendStatus(500));
})

//replacing users image with new random image
app.put('/userimage', (req, res) => {
  let pictureNumber = Math.floor(Math.random()*11)
  client.query('UPDATE users SET picturename = $1 WHERE id = $2', [pictureNumber, req.body.userid])
  .then(results => {
    res.sendStatus(200);
    console.log("picture updated");
  })
  .catch(error => res.sendStatus(500));
})

//getting comments from spesific user
app.get('/userComments/:uid', (req, res) => {
  client.query('SELECT * FROM comments WHERE userid = $1', [req.params.uid]).then(results => {
    res.json(results.rows);
  })
})

//getting posts from spesific user
app.get('/userPosts/:uid', (req, res) => {
  client.query('SELECT * FROM picture_posts WHERE ownerid = $1', [req.params.uid]).then(results => {
    res.json(results.rows);
  })
})

//posting new post
app.post('/picture_posts', (req, res) => {
  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();
  var fullDate = date +' '+ time ;

  client.query('INSERT INTO picture_posts(id, postname, picturename, ownerid, timedate, topicid, bio ) values ($1, $2, $3, $4, $5, $6, $7',
                                          [uuidv4(), req.body.postname, req.body.picturename, req.body.ownerid, fullDate, req.body.topicid, req.body.bio])
  .then(results => {
    res.sendStatus(201);
    console.log("post added!");
  })
  .catch(error => res.sendStatus(500));                                        
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})