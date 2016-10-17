var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true});

function Note(title, description, importance, dueDate, done)
{
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.dueDate = dueDate;
    this.done = done;
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
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}


module.exports = {add : publicAddNote, get : publicGet, all : publicAll};