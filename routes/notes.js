var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController');

/* GET notes listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/edit/:id/', function (req, res){
    notes.get(req.params.id, function (err, note) {
        res.render('note', {data: note});
    });
});

router.get('/new', function (req, res, next) {
    res.render('note');
});

/* Edit note */
router.post('/', notes.createNote);

module.exports = router;
