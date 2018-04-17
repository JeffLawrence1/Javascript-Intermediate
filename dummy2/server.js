let express = require('express'),
    app = express(),
    bp = require('body-parser'),
    path = require('path'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    port = 8000;

app.use(express.static(path.join(__dirname, '/static')));
app.use(bp.urlencoded({ extended: true }));

app.use(session({ secret: 'codingdojorocks' }));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
require('./config/mongoose.js');
require('./config/routes.js')(app);



app.listen(port, function() {
    console.log(`We are listening on port ${port}`);
});