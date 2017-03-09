var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'jerry likes fish',
        genre: 'Historical Fiction',
        author: 'harry',
        read: false
    },
    {
        title: 'kelsey likes cake',
        genre: 'Historical Fiction',
        author: 'rong',
        read: false
    },
    {
        title: 'rong loves her husband',
        genre: 'Report',
        author: 'harry',
        read: true
    }
];

var router = function (nav) {
    adminRouter.route('/')
        .get(function (req, res) {
            res.send('in admin page');
        });

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err1, results) {
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting');
        });
    return adminRouter;
};

module.exports = router;