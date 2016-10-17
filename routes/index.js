var express = require('express');
var router = express.Router();
var note = require('../services/notesStore.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    note.all(function (err, docs) {
        res.render('index', {notes: docs});
    });
});

module.exports = router;
