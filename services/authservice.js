"use strict";

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

const ADDRESS = process.env.ADDRESS || "localhost:";
const PORT = process.env.PORT || 7778;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/discovery", (req, res) => {
    console.log("[%s] Discovery Attempt made.", new Date().toLocaleString());
    res.status(200).json({
        action: "discovery",
        service: "Authentication/Authorization",
        date: new Date().toLocaleString(),
        address: `${ADDRESS}${PORT}`
    });
});

app.get("/healthcheck", (req, res) => {
    res.status(200).json({
        action: "healthcheck",
        status: "alive"
    });
});

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Connection to Auth Service on PORT: %s", PORT);
    }
});