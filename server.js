// les requires
var express = require('express');
    mysql = require('mysql');
    compression = require('compression');
    session = require('cookie-session');
    bodyParser = require('body-parser');
    fs = require('fs');
    html = require('html');
    bcrypt = require('bcrypt');
    validator = require('validator');


// un commentaire ici
var server = express();
    urlencodedParser = bodyParser.urlencoded({ extended: false });
    css = { style : fs.readFileSync('./style.css','utf8') };
    con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root42"
    });

con.connect(function(err) { if (err) throw err;
    con.query('CREATE DATABASE IF NOT EXISTS `matcha`', function (err) { if (err) throw err; });
    con.query('USE `matcha`', function (err) { if (err) throw err; });
    var sql = `CREATE TABLE IF NOT EXISTS users ( \
        id INT AUTO_INCREMENT PRIMARY KEY, \
        login VARCHAR(255), \
        firstname VARCHAR(255), \
        lastname VARCHAR(255), \
        pass VARCHAR(255), \
        email VARCHAR(255), \
        sex INT DEFAULT 0, \
        orientation INT DEFAULT 0, \
        bio VARCHAR(255), \
        popularity INT DEFAULT 0)`;
 con.query(sql, function (err, res) { if (err) throw err; }); });

server.use(express.static(__dirname + '/img'));

server.use(bodyParser.urlencoded({ extended: true }));
server.listen(8080);

server.get('/', function(req,res){
    res.render('index.ejs', {css: css});
})
.get('/index', function(req, res) {
    res.render('index.ejs');
})
.get('/login', function(req,res){
    res.render('login.ejs', {css: css});
})
.get('/register', function(req,res){
    res.render('register.ejs', {css: css, error: 'none'});
})

.post('/register', urlencodedParser, function(req,res){
    if (req.body.login && req.body.firstname && req.body.lastname && req.body.pass && req.body.confirmpass && req.body.mail)
    {
        if (req.body.pass === req.body.confirmpass)
        {
            regLow = /[a-z]/; regUp = /[A-Z]/;
            if (req.body.pass.length > 5)
            {
                if (req.body.pass.search(regLow)) 
                {
                    if (req.body.pass.search(regUp) !== -1) 
                    {
                        if (validator.isEmail(req.body.mail))
                        {
                            sql = 'SELECT login FROM users WHERE login = ? OR email = ?';
                            con.query(sql, [req.body.login, req.body.mail],
                            function (error, result) { if (error) throw error;
                                if (result.length == 0)
                                {
                                    bcrypt.hash(req.body.pass, 10, function(err, hash) { if (err) throw err;
                                    sql = 'INSERT INTO `users` (`login`, `firstname`, `lastname`, `pass`, `email`) VALUES (?, ?, ?, ?, ?)';
                                    variables = [req.body.login, req.body.firstname, req.body.lastname, hash, req.body.mail];
                                    con.query(sql, variables,function (err, res) { if (err) throw err; }); });




                                    res.render('register.ejs', {css: css, success: 'BRAVO TU A FAIT UN COMPTE'}); 
                                }
                                else
                                    res.render('register.ejs', {css: css, error: 'login or email already exists'}); 
                            });
                        }
                        else
                            res.render('register.ejs', {css: css, error: 'Please use a Valid E-mail !'});
                    }
                    else
                        res.render('register.ejs', {css: css, error: 'Password must contain an uppercase !'});
                }
                else
                    res.render('register.ejs', {css: css, error: 'Password must contain a lowercase !'});
            }
            else
                res.render('register.ejs', {css: css, error: 'Password must be at least 6 characters long'});
        }
        else
            res.render('register.ejs', {css: css, error: 'Password and Confirm Password must be the same!'});
    }
    else
        res.render('register.ejs', {css: css, error: 'Filling in Every field is required'});
})
