const express = require("express")
const app = express()
const port = 200
function funzione(a,b){
    b.send("Helllo wolrd from function")
}
app.get("/aaa", function (req, res){
    res.send('Hello LLL')
})
app.listen(port, () => { console.log("Luca é inserito") })


