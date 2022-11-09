const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./db/connection')
const app = express()
const port = process.env.PORT || 8080

app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
      })
    
    



mongodb.initializeDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  })
