require('dotenv').config(); //Try removing this

const express = require('express'); //returns a function
const app = express(); //Returns an object of type Express
app.use(express.json()); //Allows our server to accept JSON parsing as a body in POST command or so.

const router = express.Router();
app.use('/.netlify/functions/index', router);

const serverless = require('serverless-http');


const bot_Import = require('./to_frontend/telegrafAPI');
const botMod = bot_Import.bot;
const bToken = bot_Import.botToken;
const _url = bot_Import.hookUrl;

const repo = bot_Import.kBoards.daBase;

//botMod.telegram.setWebhook(_url + bToken); // Run this once to connect the webhook.
router.use(botMod.webhookCallback("/" + bToken));
botMod.startWebhook("/" + bToken, null, null); //To start the webhook.


router.get('/', async (req, res) => {
    console.log("Welcome to the main endpoint!");
    res.send("Hello World, Welcome to my Lambda function endpoint.");
});

router.get('/logs', async (req, res) => {
    console.log("Logs endpoint!");
    res.send(repo.dbLogs);
});



router.get('/dbread', async (req, res) => {
    console.log("DB endpoint!", "Reading DB...");
    //repo.testRetrieve();
    repo.testGetAdmin().then((R) => {
        res.send(`Read complete ${R}`);
    });
    //res.send(`Read complete ${wrote}`);
});

router.get('/dbwrite', async (req, res) => {
    console.log("DB endpoint!", "Writing to DB...");
    //repo.testSend();
    repo.testSetAdmin().then((R) => {
        res.send(`Write complete ${R}`);
    });
    //res.send(`Write complete ${written}`);
});


module.exports = app;
module.exports.handler = serverless(app);

/*
const port = 8085;
app.listen(port, () => console.log(`Listening at ${port}`));
botMod.launch();*/