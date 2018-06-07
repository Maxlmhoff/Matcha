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
    vm = require('vm');
    xoauth2 = require('xoauth2');


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
    eval(fs.readFileSync(__dirname + "/register.js")+'');
})
.post('/login', urlencodedParser, function(req,res){
    eval(fs.readFileSync(__dirname + "/login.js")+'');
})
