/**
 * Created by Yanick on 21.10.2016.
 */
var hbs = require('hbs');

// hbs.registerHelper('loop', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; ++i)
//         accum += block.fn(i);
//     return accum;
// });


hbs.registerHelper('drawStars', function(n, block) {
    var s = '';
    var activ = n;
    var inactiv = 5 - n;
    var span = '<span class="starActiv">★</span>';
    for(var i = 0; i < activ; ++i)
        s += span;

    span = '<span class="starInactiv">☆</span>';
    for(var i = 0; i < inactiv; ++i)
        s += span;
    return s;
});


module.exports = hbs;