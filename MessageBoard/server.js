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

mongoose.connect('mongodb://localhost/MessageBoard');

// define Schema variable
var Schema = mongoose.Schema;
// define Post Schema
var PostSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    message: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });
// define Comment Schema
var CommentSchema = new mongoose.Schema({
    _post: { type: Schema.Types.ObjectId, ref: 'Post' },
    name: { type: String, required: true, minlength: 4 },
    comment: { type: String, required: true }
}, { timestamps: true });
// set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
// store our models in variables
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

app.get("/", function(req, res) {
    Post.find({}, false, true).populate('_comments').exec(function(err, post) {
        res.render('index', { post: post });
    });
});

app.post("/post", function(req, res) {
    var newPost = new Post({ name: req.body.name, message: req.body.message });
    newPost.save(function(err) {
        if (err) {
            console.log(err);
            res.render('index', { errors: newMessage.errors });
        } else {
            console.log("success");
            res.redirect('/');
        }
    })
})


app.post('/post/:id', function(req, res) {
    const postID = req.params.id;
    Post.findOne({ _id: req.params.id }, function(err, post) {
        var comment = new Comment({ name: req.body.name, comment: req.body.comment });
        comment._post = post._id;
        Post.update({ _id: post._id }, { $push: { _comments: comment } }, function(err) {

        });

        comment.save(function(err) {
            if (err) {
                console.log(err);
                res.render('index', { errors: comment.errors });
            } else {
                console.log('added comment');
                res.redirect('/')
            }
        });
    });
});



app.listen(port, function() {
    console.log(`We are listening on port ${port}`);
});