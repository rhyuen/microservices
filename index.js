"use strict";

const gateway = require("./gateway.js");
const PORT = 7777;

process.on("UncaughtException", (err) => {
    console.log("GATEWAY ERROR %s", err);
});

gateway.listen(PORT, (err) => {
    if(err){
        return console.log(err);
    }console.log("Gateway is on %s", PORT);
});
