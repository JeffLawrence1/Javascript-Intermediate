var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
    index: function(req, res) {
        User.find({}, function(err, users) {
            return res.render('index', { users: users })
        })

    },
    create: function(req, res) {
        User.create({ name: req.body.name }, function(err, user) {
            return res.redirect('/');
        })

    }
}