var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController');

/* GET home page. */
router.get('/', notes.getAll);

module.exports = router;
