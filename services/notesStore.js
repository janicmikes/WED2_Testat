/**
 * Created by Yanick on 16.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true});
