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
//
//only for couple days becomes obsolete with angular
//create views folder in top level of directory becomes obsolete with angular
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//---------------------
app.get('/', function(request, response) {
    return response.render('index', { counter: addOne(request) });
});

//---------------
app.listen(port, function() {
    console.log(`We are listening on port ${port}`);
});
app.post('/two', function(request, response) {
    addTwo(request);
    response.redirect('/');
    // return response.render('index', { counter: addTwo(request) });
});
app.post('/reset', function(request, response) {
    request.session.destroy();
    response.redirect('/');
})

function addOne(request) {
    return request.session.counter = request.session.counter += 1;
}

function addTwo(request) {
    return request.session.counter = request.session.counter += 2;
}