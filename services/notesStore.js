var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true});

function Note(title, description, importance, dueDate, done)
{
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.dueDate = dueDate;
    this.done = done;
    this.createDate = Date.now();
    this.finishDate = null;
}

function enrich(data){
    data.importance1 = false;
    data.importance2 = false;
    data.importance3 = false;
    data.importance4 = false;
    data.importance5 = false;

    switch (parseInt(data.importance)){
        case 1: data.importance1 = true; break;
        case 2: data.importance2 = true; break;
        case 3: data.importance3 = true; break;
        case 4: data.importance4 = true; break;
        case 5: data.importance5 = true; break;
        default: data.importance3 = true; break;
    }
    return data;
}

function publicAddNote(title, description, importance, dueDate, done, callback)
{
    var note = new Note(title, description, importance, dueDate, done);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicGet(id, callback)
{
    db.findOne({ _id: id }, function (err, data) {
        callback( err, enrich(data));
    });
}

function publicAll(filter, order, callback)
{
    db.find(filter).sort(order).exec(function (err, data) {
        callback(err, enrich(data));
    });
}

function update(id, title, description, importance, dueDate, done, callback){
    var finishDate = null;
    if (done == "true"){
        finishDate = Date.now();
    }
    db.update({ _id: id }, { $set: { title: title, description: description, importance: importance, dueDate: dueDate, done: done, finishDate: finishDate } }, { multi: false }, function (err, numReplaced) {
        callback(err, numReplaced);
    });
}

module.exports = {add : publicAddNote, get : publicGet, all : publicAll, update: update};