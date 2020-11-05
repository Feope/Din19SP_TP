const express = require('express')
const app = express()
const port = 4000
const db = require('./db');
const cors = require('cors');
//const itemComponent = require('./components/items');
const bodyParser = require('body-parser');


 
app.use(bodyParser.json());
app.use(cors());
//app.use("/items", itemComponent);

app.get('/', (req, res) => {
 res.send( 'Hello World')
})

app.get('/items', (req, res) => {
  db.query('SELECT * FROM picture_posts').then(dbResults => {
      res.json({items: dbResults})
  })
  .catch(() => {
      res.sendStatus(500);
  });
});
 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})