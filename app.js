const express = require('express');
const fs = require('fs');
const path = ('require');
const app = express();
const PORT = process.env.PORT || 5000;

//module for handling form data
var bp = require('body-parser')
app.use( bp.json() );       // to support JSON-encoded bodies
app.use(bp.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Css & json?
app.use(express.static(__dirname + '/html'));

//Routes
app.get('/frontpage',function(req, res) {
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/list',function(req, res) {
  res.sendFile(__dirname + '/html/guestbook.html');
});

app.get('/message',function(req, res) {
  res.sendFile(__dirname + '/html/addMessage.html');
});
app.post('/message',function (req, res) {
  var data = require('./json/messages.json');
  var dataa = {
    "Name": req.body.name,
    "Country": req.body.country,
    "Message": req.body.message,
    "Date": new Date()
  };
  data.push(dataa);
  var write = JSON.stringify(data, null, 2);
    fs.writeFile('./json/messages.json',write,finished);
    function finished(err) {
      console.log("All done!");
      res.redirect('/frontpage');
    }
});

app.get('/messageAjax',function(req, res) {
  res.sendFile(__dirname + '/html/addMessageAjax.html');
});

app.get('/api',function(req, res) {
  res.sendFile(__dirname + '/json/messages.json');
});

app.post('/api',function(req, res) {
  var data = require('./json/messages.json');
  var date = new Date();
  var dataa = {
    "Name": req.body.Name,
    "Message": req.body.Message,
    "Country": req.body.Country,
    "Date": new Date()
  };
  data.push(dataa);
  var write = JSON.stringify(data, null, 2);
    fs.writeFile('./json/messages.json',write,finished);
    function finished(err) {
      console.log("All done!");
    }
});

//If route is not given, default to the frontpage
app.get('*',function (req, res) {
       res.redirect('/frontpage');
});

app.listen(PORT);
console.log("server open in http://localhost:8081/");
