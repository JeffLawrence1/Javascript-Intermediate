var express = require('express');
//express module
var app = express();
var path = require('path');
var bp = require('body-parser');
var port = 8000;
var session = require('express-session');
app.use(express.static(path.join(__dirname, '/static')));
//create static folder in top level of directory becomes obsolete with angular
app.use(bp.json());
app.use(session({ secret: 'codingdojorocks' }));
app.use(bp.urlencoded({ extended: true }));
//only for couple days becomes obsolete with angular
//create views folder in top level of directory becomes obsolete with angular
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
//---------------------
//how to link to routes below
require('./config/routes')(app);

app.get('/', function(request, response) {
    return response.render('index');
});

app.post('/result', function(request, response) {
    let sinfo = {
        name: request.body.name,
        location: request.body.location,
        language: request.body.language,
        comment: request.body.comment
    };
    // console.log(sinfo);
    return response.render('Result', sinfo);
});

app.listen(port, function() {
    console.log(`We are listening on port ${port}`);
});