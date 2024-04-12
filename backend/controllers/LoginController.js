
const Users = require ("../model/users");

class LoginController {
    static login (req,res) {
        const user=req.body.user;
        const pass=req.body.password;
        console.log("Login request from user="+user + "pass="+pass);
        
        let trovato=Users.getUser(user,pass);

        if (trovato ){
            res.statusCode=200;
            //View
            res.send("Benvenuto "+trovato.nome);
        } else {
            res.statusCode=401;
            //View
            res.send("Utente non valido");
        }
    };

    static loginRedirect (req,res) {
        res.statusCode=302;
        res.location("/login.html");
        res.send();
    };
}
module.exports= LoginController;