console.log("ciao ciao")

//commento 

const express = require("express");  //ho incluso la libreria nel programma

const app = express();               //express ritorna un oggetto 

const port = 3000;  

//app.get('/',function (req,res))
app.listen (port,() => {console.log ("Backend partito!))")})  



//LOGIN 
//function getlogin (req,res){
    const user=req.query.user;

