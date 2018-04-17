module.exports = (function() {
    return {
        index: function(request, response) {
            console.log("hey gurl, you looking goooood!");
            return response.json("ayyy gurl!");
        }
    }
})()