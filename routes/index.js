var express = require('express');
var router = express.Router();

var mock_data;
mock_data = [
    {
        title: "CAS FEE Selbststudium / Projekt Aufgabe erledigen",
        importance: 2,
        finished: true,
        description: "HTML für die note App erstellen.\nCSS erstellen für die note App."
    },
    {
        due: "Heute",
        title: "Einkaufen",
        importance: 1,
        finished: false,
        description: "Butter\nEier"
    },
    {
        title: "Mami anrufen",
        finished: false,
        description: "888 888 88 88",
    }
];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {notes: mock_data});
});

module.exports = router;
