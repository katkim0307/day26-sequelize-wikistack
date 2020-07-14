const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");

const app = express();
app.use(morgan('dev'));
// FOR GRABBING CONTENTS FROM public DIR
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    const content='';
    res.send(layout(content));
});

app.listen(3000);

