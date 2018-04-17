const express = require('express'),
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





mongoose.connect('mongodb://localhost/QuotingDojo');

app.get('/', function(request, response) {
    return response.render('Index');
});

let qSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    quote: { type: String, required: true, minlength: 10 }
}, { timestamps: true });

let Quote = mongoose.model('quotes', qSchema);

app.get('/quotes', function(request, response) {
    Quote.find({}, function(error, quotes) {
        if (error) { console.log(error); }
        response.render('quotes', { quotes: quotes });
    });
});

app.post('/quotes', function(request, response) {
    Quote.create(request.body, function(error) {
        if (error) { console.log(error); }
        response.redirect('quotes')
    });
});


app.listen(port, function() {
    console.log(`We are listening on port ${port}`);
});