/**
 * Created by Yanick on 16.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true});

function Note(noteTitle, noteDescription, noteImportance, noteDueDate, noteDone)
{
    this.noteTitle = noteTitle;
    this.noteDescription = noteDescription;
    this.noteImportance = noteImportance;
    this.noteDueDate = noteDueDate;
    this.noteDone = noteDone;
}

function publicAddNote(noteTitle, noteDescription, noteImportance, noteDueDate, noteDone, callback)
{
    var note = new Note(noteTitle, noteDescription, noteImportance, noteDueDate, noteDone);
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

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}


module.exports = {add : publicAddNote, get : publicGet, all : publicAll};