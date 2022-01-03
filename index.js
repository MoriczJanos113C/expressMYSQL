const express = require('express');
const path = require('path');

const fs = require('fs');
const port = 4444;

const app = express();


app.get("/", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/index.html"));
})


app.get("/kinezet.css", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/kinezet.css"));
})       

app.get("/pizzak", (req, res) =>{
    res.sendFile( path.join(__dirname, "./data/pizzak.json"));
})         
        
app.get("/pizza.js", (req, res) =>{
    res.sendFile( path.join(__dirname, "./public/pizza.js"));
}) 
       
app.post("/pizzak", (req, res) =>{
    let adatom = '';
    req.on('data', (chunk) => {
        adatom += chunk.toString();
    });
    req.on('end', () => {
        const ujPizza = JSON.parse(adatom);



        fs.readFile('./data/pizzak.json', (err, data) => {
            let adatok = JSON.parse(data);
            adatok.push({
                "nev": ujPizza.nev,
                "telefonszam": ujPizza.telefonszam,
                "cim": ujPizza.cim,
                "fajta": ujPizza.fajta,
                "meret": ujPizza.meret,
                "liszt": ujPizza.liszt,
            });
            fs.writeFile('./data/pizzak.json', JSON.stringify(adatok), () => {
                res.end(JSON.stringify(adatok));
            })
        })
    })
})

       
            

app.get("/", (req, res) => {
    res.redirect("/");
})           

app.listen(port);


