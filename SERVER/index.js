const express = require('express');
const cors = require('cors');
const app = express();

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

const port = 4020;

app.set('port', port);
app.use(express.json());

app.use(cors());


app.post('/api/commentsection', (req, res) => {
  MongoClient.connect(url, (err, conn) => {
    if (err){
      throw err;
    }
    const dbo = conn.db("commentsection");
    const commentObj = {comment: req.body.comment};

    dbo.collection("comments").insertOne(commentObj, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        conn.close();
        res.type('application/json');
        res.status(200);
        res.json(result);
      }
    });


  });
});

app.get('/api/commentsection', (req, res) => {
  MongoClient.connect(url, (err, conn) => {
    if (err) {
      throw err;
    }
    const dbo = conn.db("commentsection");

    dbo.collection("comments").find({}).toArray( (err, result) => {
      if (err) {
        throw err;
      }
      conn.close();
      res.type('application/json');
      res.status = 200;
      res.send(result);
    });
  });

});



app.listen(port, () => {
  console.log(`Express server started on http://localhost:${port}`);
  console.log(__dirname);
});
