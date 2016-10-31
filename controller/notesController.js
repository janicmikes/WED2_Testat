var store = require("../services/notesStore");

create = function (req, res) {
    store.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done, function (err, note) {
        res.redirect("/"+req._parsedUrl.search);
    });
};

getAll = function (req, res) {
    var filter, order, theme;
    var buttons = {
        filter: {
            class: "",
            href: "&filter=all",
            current_href: ""
        },
        finish: {
            class: "",
            href: "&order=finish"
        },
        create: {
            class: "",
            href: "&order=create"
        },
        importance: {
            class: "",
            href: "&order=importance"
        },
        theme: {
            class: "",
            href: "&theme=dark",
            current_href: ""
        },
        sorting_href: ""
    };

    // Prepare the Theme Button
    if (req.query.theme == "dark") {
        buttons.theme.class = "active";
        buttons.theme.href = "";
        buttons.theme.current_href = "&theme=dark";
        theme = "dark";
    } else {
        buttons.theme.class = "";
        buttons.theme.href = "&theme=dark"
        buttons.theme.current_href = "";
    }

    // Prepare the Filter Button
    if (req.query.filter == "all") {
        buttons.filter.class = "active";
        buttons.filter.href = "";
        buttons.filter.current_href = "&filter=all"
        filter = {};
    } else {
        buttons.filter.class = "";
        buttons.filter.href = "&filter=all"
        buttons.filter.current_href = ""
        filter = {done: false};
    }


    var direction = req.query.direction == "desc" ? -1 : 1;
    if (direction == -1) {
        buttons.direction = true;
        buttons.direction = ""
    }
    buttons.show = req.query.show;


    switch (req.query.order) {
        case "finish":
            order = {dueDate: 1 * direction};
            if (direction > 0) {
                buttons.finish.href = "&order=finish&direction=desc";
                buttons.finish.class = "active asc";
                buttons.sorting_href = "&order=finish";
            } else {
                buttons.finish.href = "&order=finish";
                buttons.finish.class = "active desc";
                buttons.sorting_href = "&order=finish&direction=desc";
            }
            break;
        case "create":
            order = {createDate: 1 * direction};
            if (direction > 0) {
                buttons.create.href = "&order=create&direction=desc";
                buttons.create.class = "active asc";
                buttons.sorting_href = "&order=create";
            } else {
                buttons.create.href = "&order=create";
                buttons.create.class = "active desc";
                buttons.sorting_href = "&order=create&direction=desc";
            }
            break;
        case "importance":
            order = {importance: -1 * direction};

            if (direction > 0) {
                buttons.importance.href = "&order=importance&direction=desc";
                buttons.importance.class = "active asc";
                buttons.sorting_href = "&order=importance";
            } else {
                buttons.importance.href = "&order=importance";
                buttons.importance.class = "active desc";
                buttons.sorting_href = "&order=importance&direction=desc";
            }
            break;
        default:
            order = {createDate: -1}
            buttons.create.href = "&order=create&direction=desc";
            buttons.create.class = "active desc";
            buttons.sorting_href = "";
    }

    store.all(filter, order, function (err, data) {
        res.render('index', {title: "Notes - A WED2 Testat", theme: theme, buttons: buttons, notes: data});
    });
};

get = function (req, res) {
    var theme = "";
    if (req.query.theme == "dark") {
        theme = "dark";
    }

    store.get(req.params.id, function (err, data) {
        res.render('note', {theme: theme, note: data});
    });
};

newnote = function (req, res) {
    var theme = "";
    if (req.query.theme == "dark") {
        theme = "dark";
    }
    res.render('note', {theme: theme});
};

update = function (req, res) {
    store.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.done, function (err, numReplaced) {
        res.redirect("/"+req._parsedUrl.search);
    });
};

module.exports = {create: create, get: get, getAll: getAll, update: update, newnote: newnote};