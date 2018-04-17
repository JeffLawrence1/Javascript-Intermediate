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
require('./config/mongoose')(app);

require('./config/routes')(app);



mongoose.connect('mongodb://localhost/MongooseDashboard');



const mDSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    age: { type: Number, required: true }
}, { timestamps: true });

const mD = mongoose.model('mongooseDashboard', mDSchema);

app.get('/', function(request, response) {
    mD.find({}, function(error, results) {
        if (error) { console.log(error); }
        response.render('Index', { mDs: results });
    });
});

app.get('/new', function(request, response) {
    response.render('new');
});


app.post('/', function(request, response) {
    mD.create(request.body, function(error, result) {
        if (error) { console.log(error); }
        response.redirect('/')
    });
});


app.get('/:id', function(req, res) {
    mD.find({ _id: req.params.id }, function(error, response) {
        if (error) { console.log(error); }
        res.render('show', { mDs: response[0] });
    });
});

app.get('/:id/edit/', function(req, res) {
    mD.find({ _id: req.params.id }, function(error, response) {
        if (error) { console.log(error); }
        res.render('edit', { mDs: response[0] });
    })
});

app.post('/:id', function(req, res) {
    mD.update({ _id: req.params.id }, req.body, function(error, result) {
        if (error) { console.log(error); }
        res.redirect('/');
    });
});

app.post('/:id/delete', function(req, res) {
    mD.remove({ _id: req.params.id }, function(error, result) {
        if (error) { console.log(error); }
        res.redirect('/');
    });
});

app.listen(port, function() {
    console.log(`We are listening on port ${port}`);
});