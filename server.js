const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    "publish_date": "2014-12-14",
    "publisher": "No Starch Press",
    "numOfPages": 472,
},
{
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "publish_date": "2012-07-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 254,
},
{
    "isbn": "9781449365035",
    "title": "Speaking JavaScript",
    "author": "Axel Rauschmayer",
    "publish_date": "2014-02-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 460,
}];


const paginate = (data, page, limit) => {
    const start = limit * (page-1);
    const end = limit * page;
    if(data.length <= start || start < 0 || end <= 0 || limit <= 0) return [];
    return data.slice(start, end);
}


// returns a list of all the existing books,
app.get('/', function(req, res) {
    // console.log(req.query);
    let {page = 1, limit = 5} = req.query;
    page = parseInt(page); limit = parseInt(limit);
    console.log('page = ', page, 'limit = ', limit);
    console.log(paginate(books, page, limit));
    res.render('pages/index', {
        books : paginate(books, page, limit),
        next: parseInt(page)+1,
        prev: parseInt(page)-1,
        page: page,
        limit: limit
    });
});


// adds a book to the dictionary.
app.post('/book', function(req, res) {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.redirect('/');
})



app.listen(PORT, () => console.log(`Running on port : ${PORT}`))