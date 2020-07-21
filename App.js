const express = require("express");
const morgan = require("morgan");
const notFoundPage = require("./views/notFoundPage");
const errorPage = require("./views/errorPage");
const layout = require("./views/layout");
const { db } = require("./models");
const models = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

const app = express();

app.use(morgan('dev'));
// FOR GRABBING CONTENTS FROM public DIR
app.use(express.static(__dirname + "/public"));
// PARSE THE REQUEST BODY
app.use(express.urlencoded({ extended: false }));
// PARSE THE JSON
app.use(express.json());

db.authenticate().
then(() => {
    console.log('FINALLY connected to database wikistack');
})

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get("/", (req, res) => {
    const content='';
    res.send(layout(content));
});

// app.get("/", (req, res, next) => {
//     res.redirect('/wiki');
// })

// HTTP 404 NOT FOUND PAGE
app.use((req, res, next) => {
    res.status(404).send(notFoundPage());
});

// HTTP 500 INTERNAL SERVER ERROR
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(errorPage(err));
}); 

const PORT = 3000;

const init = async () => {
    // SYNC BOTH USER AND PAGE MODELS
    // .sync() is an asynchronous operation and returns a promise
    await models.User.sync()
    await models.Page.sync()
    // THIS DROPS ALL TABLES THEN RECREATES THEM BASED ON THE JS DEFINITION
    models.db.sync({force: true})
    app.listen(PORT, () => {
        console.log(`SERVER IS LISTENING ON PORT ${PORT}!`);
    });
}

init();

// app.listen(3000);

