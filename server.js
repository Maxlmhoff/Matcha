// les requires
var express = require('express');
    app = express();
    compression = require('compression');
    session = require('cookie-session');
    bodyParser = require('body-parser');
    fs = require('fs');
    html = require('html');

// un commentaire ici
    urlencodedParser = bodyParser.urlencoded({ extended: false });
    css = {
         style : fs.readFileSync('./style.css','utf8')
     };

//images
var title = fs.readFileSync('img/title.png');
    background = fs.readFileSync('img/background.png');

app.use(express.static(__dirname + '/img'));
// app.use(session({secret: 'todotopsecret'}));
// app.use(compression());

app.get('/', function(req,res){
    res.render('index.ejs', {css: css});
})
.get('/index', function(req, res) {
    res.render('index.ejs');
})
.get('/login', function(req,res){
    res.render('login.ejs', {css: css});
})
.get('/register', function(req,res){
    res.render('register.ejs', {css: css});
})
.post('/new_user', urlencodedParser, function(req,res){
    res.render('new_user.ejs', {css: css});
})
.post('/connexion', urlencodedParser, function(req,res){
    res.render('connexion.ejs', {css: css});
})

// app.get('/sous-sol', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
// });

// app.get('/etage/1/chambre', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('Hé ho, c\'est privé ici !');
// });
// app.get('/etage/:etagenum/chambre', function(req, res) {
//     res.render('chambre.ejs', {etage: req.params.etagenum});
// });
// app.get('/compter/:nombre', function(req, res) {
//     var noms = ['Robert', 'Jacques', 'David'];
//     res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
// });
// app.get('/todo', function(req, res) {
//     res.render('todo.ejs', {todolist: req.session.todolist});
// });
// app.post('/todo/ajouter', urlencodedParser, function(req, res) {
//     // if (req.body.newtodo != '') {
//         req.session.todolist.push(req.body.newtodo);
//     // }
//     res.redirect('/todo');
// });

// app.get('/todo/supprimer/:id', function(req, res) {
//     // if (req.params.id != '') {
//         req.session.todolist.splice(req.params.id, 1);
//     // }
//     res.redirect('/todo');
// });

// app.use(function(req, res, next) {
//    res.redirect('/todo'); 
// });





.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Erreur 404 : Page introuvable !');
});
app.listen(8080);
