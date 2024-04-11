const express = require("express");
const app = express()
const port = 3000

app.get("/", function (req, res) {
    const print = res.send("Home")
})
app.get("/diego", function (req, res) {
    res.send("Pagina Diego")
})
app.listen(port, () => { console.log("Sei qui") })