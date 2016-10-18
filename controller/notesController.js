var store = require("../services/notesStore");

create = function (req, res) {
    store.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done, function (err, note) {
        res.redirect("/");
    });
}

getAll = function (req, res) {
    var filter = req.query.show;
    filter = filter == "all" ? {} : { done: false };

    var orderBy = req.query.order;

    var direction = req.query.direction == "desc" ? -1 : 1;

    switch(orderBy){
        case "finish": orderBy = { finishDate: 1 * direction }; break;
        case "create": orderBy = { createDate: 1 * direction }; break;
        case "importance": orderBy = { importance: -1 * direction }; break;
        default: orderBy = { createDate: -1 }
    }


    store.all(filter, orderBy, function (err, data) {
        res.render('index', {notes: data});
    });
}

get = function (req, res) {
    store.get(req.params.id, function (err, data) {
        res.render('note', {note: data});
    });
}

update = function(req, res){
    store.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done, function (err, numReplaced){
        res.redirect("/");
    });
}

module.exports = {create: create, get: get, getAll: getAll, update: update};