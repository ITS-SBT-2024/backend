
function logger (req, res, next){
    console.log("Chiamato "+req.url+"!!!!");
    next();
 }

module.exports = logger;