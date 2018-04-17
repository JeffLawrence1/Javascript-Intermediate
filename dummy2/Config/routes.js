var users = require('./../controllers/users.js');
module.exports = function(app) {
    app.get('/', function(req, res) {
        users.index(req, res);
    })
    app.post('/create', function(req, res) {
        users.create(req, res);
    })
}