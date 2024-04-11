const express = require("express")

const app = express()

const port = 3000

app.get("/", (req, res) => {
    res.send("<h1>Benvenuto</h1>")
})

app.get("/alessio", (req, res) => {
    res.send("Ciao")
})

app.listen (port,() => {console.log ("Backend partito!")});