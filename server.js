#!/usr/bin/env nodejs

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs')


app.use(cors());
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// First route
app.get('/dota2cp/api/', (req, res) => {
    fs.readFile('../countersByHero.txt', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.json({msg: "Success", data: data});
    })
})

const port = 7033;
app.listen(port, () => { console.log('We are live on ' + port); });