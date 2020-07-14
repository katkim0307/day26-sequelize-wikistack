const express = require("express");
const morgan = require("morgan");
const { views } = require("./views");
const layout = require("./views/layout");
const { db } = require("./models");

const app = express();
app.use(morgan('dev'));
// FOR GRABBING CONTENTS FROM public DIR
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    const content='';
    res.send(layout(content));
});

db.authenticate().
then(() => {
    console.log('FINALLY connected to database wikistack');
})

app.listen(3000);



