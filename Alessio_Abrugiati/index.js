const express = require("express")

const app = express()

const port = 3000

app.get("/", (req, res) => {
    res.send("<h1>Benvenuto</h1>")
})

app.get("/alessio", (req, res) => {
    const user = req.query.user
    if (user) {
        res.send("Eccoti qui")
    } else {
        res.send("Non riconosciuto")
    }
    res.send("Ciao")
})

app.listen (port,() => {console.log ("Backend partito!")});