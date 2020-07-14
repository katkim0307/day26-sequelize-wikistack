const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan('dev'));
// FOR GRABBING CONTENTS FROM public DIR
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send(`<div>hello world</div>`);
})

app.listen(3000);

