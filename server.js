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
    try{
        if(req.params.timestring.parseInt()){
            date = req.params.timestring;
        }
    }
    catch(err){
        date = moment(req.params.timestring, "MMMM, D, YYYY");
    }
    
    var d = new Date(date);
    if(d){
        res.send({
            unix: d.now(),
            natural: d.toDateString()
        })
    }
    else{
       res.send({
            unix: null,
            natural: null
        })
    }
})

app.listen(8080, function(){
    console.log("Listening on port 8080")
});