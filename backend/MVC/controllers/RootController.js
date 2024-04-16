const path = require("path");

class RootController {
    static homepage (req,res) {
        res.sendFile(path.resolve(__dirname + '/../public/books.html'));
    };

}
module.exports= RootController;