const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database')
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=>{
    if (err){
        console.log('COULD NOT Connect to Database: ', err)
    }else{
        console.log(config.secret);
        console.log('Connected to database' + config.db)
    }
});
app.use(express.static(__dirname + '/Client/dist/Client')); 
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/Client/dist/Client/index.html'));
  });
  
  app.listen(1200, ()=>{
      console.log('Listening on port 1200');
  });  