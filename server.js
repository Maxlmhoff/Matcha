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
    mailer = require("nodemailer");    
    rand = require("random-key");
    eschtml = require('htmlspecialchars');

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
        confirmkey VARCHAR(10), \
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
        var login = eschtml(req.body.login);
            firstname = eschtml(req.body.firstname)
            lastname = eschtml(req.body.lastname);
            pass = eschtml(req.body.pass);
            email = eschtml(req.body.mail);
            regLow = /[a-z]/; regUp = /[A-Z]/;
            if (pass.length > 5)
            {
                if (pass.search(regLow)) 
                {
                    if (pass.search(regUp) !== -1) 
                    {
                        if (validator.isEmail(email))
                        {
                            sql = 'SELECT login FROM users WHERE login = ? OR email = ?';
                            con.query(sql, [login, email],
                            function (error, result) 
                            { if (error) throw error;
                                if (result.length == 0)
                                {
                                var smtpTransport = mailer.createTransport("SMTP", 
                                    {
                                        service: "Gmail", auth: { user: "find.your.peer.42@gmail.com", pass: "Qwerty1234zxcv" } 
                                    });
                                    key = rand.generateDigits(9);
                                    mail = 
                                        {
                                            from: "find.your.peer.42@gmail.com", to: email, subject: "Confirmation de votre compte",
                                            html: '<html><body><div align=center> \
                                            CLICK ON THE FOLLOWING LINK TO VALIDATE YOUR ACCOUNT: <BR />\
                                            <a href=http://localhost:8080/confirm.js?login='+login +'&key='+key +'>Confirm your Account</a> \
                                            </div></body></html>'
                                        }
                                        smtpTransport.sendMail(mail, function(error, response){
                                        if (error) { 
                                            res.render('register.ejs', {css: css, error: 'Error whilst sending e-mail : ' + error}); 
                                        }
                                        else { 
                                            res.render('register.ejs', {css: css, success: "Un mail de confirmation vient d'être envoyer !"});
                                        }
                                        smtpTransport.close(); });
                                        bcrypt.hash(pass, 10, function(err, hash) { if (err) throw err;
                                        sql = 'INSERT INTO `users` (`login`, `firstname`, `lastname`, `pass`, `email`) VALUES (?, ?, ?, ?, ?, ?)';
                                        variables = [login, firstname, lastname, hash, email, key];
                                        con.query(sql, variables,function (err, res) { if (err) throw err; }); });
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
