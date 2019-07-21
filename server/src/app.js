const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongo = require('mongodb')

const MongoClient = mongo.MongoClient
const uri = "mongodb+srv://default-user:aadjusting@cluster0-peiej.mongodb.net/test?retryWrites=true&w=majority"
var client

var mongoClient = new MongoClient(uri, {
  reconnectTries:
    Number.MAX_VALUE, autoReconnect: true, useNewUrlParser: true
})

mongoClient.connect((err, db) => { // returns db connection
  if (err != null) {
    console.log(err)
    return
  }
  client = db
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get("/todo", (req, res) => {
  const collection = client.db("test").collection("todos")
  collection.find().toArray(function (err, results) {
    if (err) {
      console.log(err)
      res.send([])
      return
    }

    res.send(results)
  })
})

app.post("/addTodo", (req, res) => {
  const collection = client.db("test").collection("todos")
  var todo = req.body.todo // Parse the data from the request's body
  collection.insertOne({ title: todo }, function (err, results) {
    if (err) {
      console.log(err)
      res.send("")
      return
    }
    res.send(results.ops[0])
  })
})

app.listen(process.env.PORT || 8082)