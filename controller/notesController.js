var store = require("../services/notesStore");

create = function (req, res) {
    store.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done, function (err, note) {
        res.redirect("/");
    });
};

getAll = function (req, res) {
    var filter = req.query.show;

    var buttons = {
        filter: {
            class: "",
            action: "",
            baseaction: ""
        },
        finish: {
            class: "",
            action: "",
            baseaction: ""
        },
        create: {
            class: "",
            action: "",
            baseaction: ""
        },
        importance: {
            class: "",
            action: "",
            baseaction: ""
        }
    };
    var query = req.query;

    // TODO: wenn sortiert war, muss der sortier parameter bei allen links die genereiert werden mitgegeben werden,
    // sonst geht die Sortierung beim wechsel verlohren.

    // Fall: Sort by importnace desc dann den Filter ein und aus schalten sollte die sortierung nicht veraendern.
    if(filter == "all"){
        buttons.filter.class = "active";
        buttons.filter.action = "/?"+req.query;
        query.filter = "";
        filter = {};
    } else {
        buttons.filter = "";
        filter = { done: "false" }
    }



    var orderBy = req.query.order;

    var direction = req.query.direction == "desc" ? -1 : 1;

    switch(orderBy){
        case "finish":
            orderBy = { finishDate: 1 * direction };
            buttons.finish = "active" + direction?" asc":" desc";
            break;
        case "create": orderBy = { createDate: 1 * direction };
            buttons.create = "active" + direction?" asc":" desc";
            break;
        case "importance": orderBy = { importance: -1 * direction };
            buttons.importance = "active" + direction?" asc":" desc";
            break;
        default:
            orderBy = { createDate: -1 }
            buttons.create = "active" + direction?" asc":" desc";
    }


    store.all(filter, orderBy, function (err, data) {
        res.render('index', {buttons: buttons, notes: data});
    });
};

get = function (req, res) {
    store.get(req.params.id, function (err, data) {
        res.render('note', {note: data});
    });
};

update = function(req, res){
    store.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done, function (err, numReplaced){
        res.redirect("/");
    });
};

module.exports = {create: create, get: get, getAll: getAll, update: update};