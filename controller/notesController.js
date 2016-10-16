/**
 * Created by Yanick on 16.10.2016.
 */
var store = require("../services/notesStore");

module.exports.createNote = function(req, res)
{
    var order = store.add(req.body.noteTitle, req.body.noteDescription, req.body.noteImportance, req.body.noteDueDate, req.body.noteDone, function (err, note) {
        res.format({
            'text/html': function(){
                res.render("index");
            }
        });
    })
}