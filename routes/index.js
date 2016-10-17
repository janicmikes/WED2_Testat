var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController');

/* GET home page. */
router.get('/', function (req, res) {
    notes.getAll(req, res);
});

module.exports = router;
