const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0s4gz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json())


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteer-network").collection("items");
  app.post('/addEvent',(req, res) => {
      const newEvent = req.body;
    //   console.log(newEvent)
      collection.insertOne(newEvent)
      .then(result =>{
         res.send(result.insertedCount>0)
      })
  })
  app.get('/events',(req, res) => {
      collection.find()
      .toArray((err,documents) => {
          res.send(documents)
      })
  })
  app.delete('/deleteEvent/:id',(req, res) => {
      const deleteEvent = req.params.id;
      console.log(deleteEvent)
  })
 

});


app.get('/', (req, res)=> {
  res.send('hello world')
})

app.listen(5055)