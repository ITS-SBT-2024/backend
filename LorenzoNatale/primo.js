const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("Ciao")
})

app.get("/", (req, res) => {
    const user = req.query.user
    if (user) {
        res.send("Eccoti qui")
    } else {
        res.send("Non riconosciuto")
    }
    res.send("Ciao")
})

app.listen (port,() => {console.log ("Lorenzo il Backend partito!")});


