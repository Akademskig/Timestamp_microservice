var express = require('express')
var app = express();
var path = require('path')
var fs = require('fs')
var moment = require('moment');
var styles = path.join(__dirname, '.');

app.use(require('stylus').middleware(styles))
app.get(app.use(express.static(styles)))

app.get('/', function(req, res){
    var htmlFile = path.join(__dirname,'index.html');
    res.sendFile(htmlFile);
    
})

app.get('/:timestring', function(req, res){
    var date;
    if(req.url=='/favicon.ico'){
        return;
    }
    if(parseInt(req.params.timestring)){
        date = moment(req.params.timestring, "X");
    }
    else{
        date = moment(req.params.timestring, "MMMM, D, YYYY");
    }
    
    
    if(date){
        res.send({
            unix: date.format("X"),
            natural: date.format("MMMM D, YYYY")})
    }
    else{
       res.send({
            unix: null,
            natural: null
        })
    }
    
})

app.listen(process.env.PORT || 8080, function(){
    console.log("Listening on port 8080")
});