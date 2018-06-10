// les requires
var express = require('express')
    mysql = require('mysql')
    compression = require('compression')
    cookie = require('cookie-session')
    bodyParser = require('body-parser')
    fs = require('fs')
    html = require('html')
    bcrypt = require('bcrypt')
    validator = require('validator')
    mailer = require("nodemailer")    
    rand = require("random-key")
    eschtml = require('htmlspecialchars')
    vm = require('vm')
    ssn = require('express-session')


// un commentaire ici
var server = express()
    urlencodedParser = bodyParser.urlencoded({ extended: false })
    css = { style : fs.readFileSync('./style.css','utf8') }
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root42"
    })

con.connect(function(err) { if (err) throw err
    con.query('CREATE DATABASE IF NOT EXISTS `matcha`', function (err) { if (err) throw err })
    con.query('USE `matcha`', function (err) { if (err) throw err })
    var sql = `CREATE TABLE IF NOT EXISTS users ( \
        id INT AUTO_INCREMENT PRIMARY KEY, \
        login VARCHAR(255), \
        firstname VARCHAR(255), \
        lastname VARCHAR(255), \
        pass VARCHAR(255), \
        email VARCHAR(255), \
        confirmkey VARCHAR(10), \
        confirm INT DEFAULT 0, \
        gender VARCHAR(255), \
        orientation VARCHAR(255), \
        bio VARCHAR(255), \
        popularity INT DEFAULT 0)`

 con.query(sql, function (err, res) { if (err) throw err }) })

server.use(express.static(__dirname + '/img'))
server.use(ssn({ secret: 'Eloi has a beautiful secret', resave: true, saveUninitialized: true }))
server.use(bodyParser.urlencoded({ extended: true }))
server.listen(8080)

server.get('/', function(req,res){
    ssn = req.session
    res.render('index.ejs', {css: css})
})
.get('/index', function(req, res) {
    ssn = req.session
    res.render('index.ejs')
})
.get('/login', function(req,res){
    ssn = req.session
    res.render('login.ejs', {css: css})
})
.get('/register', function(req,res){
    ssn = req.session
    res.render('register.ejs', {css: css, error: 'none'})
})
.get('/profile', function(req,res){
    ssn = req.session
    if (ssn.profile == undefined)
        res.render('login.ejs', {css: css, error: 'Please login to access your profile page'})
    else 
        res.render('profile.ejs', {css: css, error: 'none', profile: ssn.profile})
})
.get('/logout', function(req,res){
    ssn = req.session
    req.session.destroy()
    res.redirect('/')
})
.post('/register', urlencodedParser, function(req,res){
    eval(fs.readFileSync(__dirname + "/back/register.js")+'')
})
.post('/profile', urlencodedParser, function(req,res){
    eval(fs.readFileSync(__dirname + "/back/profile.js")+'')
})
.post('/login', urlencodedParser, function(req,res){
    eval(fs.readFileSync(__dirname + "/back/login.js")+'')
})
.post('/forgot', urlencodedParser, function(req,res){
    eval(fs.readFileSync(__dirname + "/back/forgotpass.js")+'')
})
.get('/confirm', urlencodedParser, function(req,res){
    eval(fs.readFileSync(__dirname + "/back/confirm.js")+'')
 })
