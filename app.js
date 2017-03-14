const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const port = 3000;
let frenchMovies = [];

app.set('views', './views');
app.set('view engine', 'ejs');


// to service static files from the public folder
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies', (req, res) => {

    const title = "Films français des 30 dernières années";
    frenchMovies = [
        { title: 'Le fabuleux destin d\'Amélie Poulain', year: 2001},
        { title: 'Buffet froid', year: 1979},
        { title: 'Le diner de cons', year: 1998},
        { title: 'de rouille et d\'os', year: 2012}
    ]
    res.render('movies', { title: title, movies: frenchMovies});
});

// // create application/x-www-form-urlencoded parser
// // https://github.com/expressjs/body-parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.post('/movies', urlencodedParser, (req, res) => {
//     if (!req.body) {
//         return res.sendStatus(400);
//     } else {
//         // res.send('welcome, ' + req.body.movietitle);
//         console.log('req.body', req.body);
//         res.send(req.body.movietitle);
//     } 
// });

//!\ In upload.fields([]), the empty array '[]' is required
app.post('/movies', upload.fields([]), (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    } else {
        const formData = req.body; 
        console.log('form data: ', formData);
        const newMovie = { title: formData.movietitle, year: formData.movieyear };
        frenchMovies = [... frenchMovies, newMovie];
        res.sendStatus(201);
    } 
});


// create application/x-www-form-urlencoded parser
// https://github.com/expressjs/body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/movies-old-browser', urlencodedParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(500);
    } else {        
        frenchMovies = [... frenchMovies, { title: req.body.movietitle, year: req.body.movieyear }];
        res.sendStatus(201);
    } 
});


app.get('/movies/add', (req, res) => {
    res.send('prochainement, un formulaire d\'ajout ici');
});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    res.render('movie-details');
});

app.get('/movie-search', (req, res) => {
    res.render('movie-search');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});