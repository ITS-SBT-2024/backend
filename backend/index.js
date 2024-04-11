const express = require("express");
const app = express()
const port = 3000

app.get("/", function (req, res) {
    res.send("Home")
})
app.get("/alessandro", function (req, res) {
    res.send("<h1>Questo è l'h2 della page Alessandro<h1>")
})
app.listen(port, () => { console.log("Sei qui") })