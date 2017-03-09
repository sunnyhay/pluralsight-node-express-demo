var express = require('express');

var app = express();

var port = 5000;

var nav = [{
    Link: '/books',
    Text: 'Book1',
            }, {
    Link: '/authors',
    Text: 'Author1'
    }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
//app.set('view engine', 'jade');
//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', '.hbs');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'hello little Jerry',
        nav: [{
            Link: '/books',
            Text: 'Books',
        }, {
            Link: '/authors',
            Text: 'Authors'
        }]
    });
});

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});