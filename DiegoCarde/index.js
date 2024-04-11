const express = require("express");
const app = express()
const port = 3000

app.get("/", function (req, res) {
    res.send("Home")
})
app.get("/diego", function (req, res) {
    res.send("<h1>Questo è l'h1 della page Diego</h1>")
})
app.listen(port, () => { console.log("Sei qui") })