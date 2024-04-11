const express = require("express");
const app = express();
const port = 80;

const userDB=[
    {
        username:"paolo",
        password:"777",
        nome:"Paolo Rossi"
    },
    {
        username:"giovanni",
        password:"2020",
        nome:"Giovanni Mengoni"
    },
    {
        username:"maurizio",
        password:"123",
        nome:"Maurizio D'Ottavi"
    },
    {
        username:"gigi",
        password:"345",
        nome:"Pierluigi Alessandrini"
    },
    {
        username:"bill",
        password:"678",
        nome:"William Shakespeare"
    },
];

app.get("/login", function(req,res){
    const user = req.query.user;
    const password = req.query.password;
    trovato = null

    }
)