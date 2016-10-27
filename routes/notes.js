var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController');

router.get('/edit/:id/', notes.get);

router.post('/edit/:id', notes.update)

router.get('/new', notes.newnote);

router.post('/new', notes.create);

module.exports = router;
