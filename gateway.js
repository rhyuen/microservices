"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




app.get("/", (req, res) => {
    res.status(200).json({

    });
});

app.get("/discovery", (req, res) => {
    const PORTRANGESTART = 7770;
    const PORTRANGEEND = 7780;

    // request("http://localhost:7778/discovery", (err, res, body) => {
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(res.statusCode);
    //         console.log(body);
    //     }
    // });

    for(let i = PORTRANGESTART; i <= PORTRANGEEND; i++){
        (() => {
            request(`http://localhost:${i}/discovery`, (err, response, body) => {
                if(err){
                    if(err.code === "ECONNREFUSED"){
                        console.log("PORT %s : NOTHING", err.port);
                    }else{
                        console.log("Actual error: %s", err);
                    }
                }else{
                    console.log(body);
                }
            });
        })();
    }
});

const services = [
    {name: "Authentication", address: "localhost://7778", health: {alive: false, lastCheck: "Never"}},
    {name: "User API", address: "localhost://7779", health: {alive: false, lastCheck: "Never"}, }
];

app.get("/healthchecks", (req, res) => {
    let healthResponse = "";
    services.forEach((svc) => {
        healthResponse += `${svc.name} \t ${svc.health.lastCheck}\n`;
    });
    res.status(200).send(healthResponse);
});

module.exports = app;