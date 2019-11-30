var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userrouter = require("./userrouter");
var imageRouter = require("./imageRouter");
var mongoose = require('mongoose');
var cors = require("cors");
app.use(express.static('uploads'))
app.use(cors());
mongoose.connect('mongodb://localhost:27017/sendGrid',{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/timeline",imageRouter);


app.use("/",userrouter)
var server = app.listen(8081, function (){
    var host = server.address().address
    var port = server.address().port
    console.log("My server is running at http://%s:%s",host , port);

});

