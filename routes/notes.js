var express = require('express');
var router = express.Router();

/* GET notes listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/new', function (req, res, next) {
    res.render('note', {method: "post", id: 1});
});

/* Create new note */
router.put('/new', function (req, res, next) {
    res.send('respond with a resource');
});

/* Edit note */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
