var users = require('./../Controllers/Users');
module.exports = function(app) {
    app.get('/', function(request, response) {
        console.log("hello");
        // return response.json("ksdjflksjdklfj");
        users.index(request, response);
    })
}