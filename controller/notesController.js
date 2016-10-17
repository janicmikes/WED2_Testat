var store = require("../services/notesStore");

create = function (req, res) {
    var order = store.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done, function (err, note) {
        res.redirect("/");
    });
}

getAll = function (req, res) {
    store.all(function (err, data) {
        res.render('index', {notes: data});
    });
}

get = function (req, res) {
    store.get(req.params.id, function (err, data) {
        res.render('note', {note: data});
    });
}

module.exports = {create: create, get: get, getAll: getAll};