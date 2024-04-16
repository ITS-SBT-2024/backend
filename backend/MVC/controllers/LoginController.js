
const Users = require ("../model/Users");

class LoginController {
    static login (req,res) {
        const user=req.body.user;
        const pass=req.body.password;
        console.log("Login request from user="+user + " pass="+pass);
        
        let trovato=Users.getUser(user,pass);
        
        if (trovato ){
            console.log("user="+user + " Found");
            res.statusCode=200;
            //View
            res.cookie("authenticato", user);
            res.send({"user":user});
        } else {
            res.statusCode=401;
            //View
            res.send({"msg":"user not found"});
        }
    };

    static loginRedirect (req,res) {
        res.statusCode=302;
        res.location("/login.html");
        res.send();
    };

    static logout(req,res) {
        res.statusCode=200;
       //Rimuove il cookie
       res.clearCookie("authenticato");
       res.send({"msg":"Logout done"});
    };
    
    static loggedin(req,res) {
        if (req.cookies && req.cookies.authenticato) {
            res.statusCode=200;
            res.send({"user":req.cookies.authenticat});
        } else {
            res.statusCode=401;
            res.send();
        }
    };

    static isUserAuth (req, res, next){
        //next();
        //return;
        console.log("isUserAuth "+req.url+" ... cookies=", req.cookies);
        if  (req.url=="/" || req.url=="/login") {
            console.log("/ or /login ... cookies=", req.cookies);
            // se ci viene chiesta la login lo facciamo passare perche' vuol dire che l'utente 
            // vuole authenticarsi e lo permettiamo
            next();
            return;
        }
        if (req.cookies && req.cookies.authenticato) {
            console.log("URL:"+req.url + " user:"+req.cookies.authenticato);
            // qui nella realtà dovremmo controllare che in effetti l'utente esista davvero e
            // la stringa di cookie dovrebbe essere criptata per evitare manomissioni
            // ma noi per ora ce ne freghiamo...
            next();
        } else {
            res.statusCode=401;
            res.json({"msg":"Login Failed"});
        }
    }

}
module.exports= LoginController;