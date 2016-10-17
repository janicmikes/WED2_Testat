var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController');

router.get('/edit/:id/', notes.get);

router.get('/new', function (req, res, next) {
    res.render('note');
});

router.post('/new', notes.create);

module.exports = router;
