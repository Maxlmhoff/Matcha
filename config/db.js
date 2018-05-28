var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root42"
});

con.connect(function(err) {
if (err) throw err;
con.query('CREATE DATABASE IF NOT EXISTS `matcha`',
	function (err) { if (err) throw err; });
con.query('USE `matcha`',
	function (err) { if (err) throw err; });

var sql = `CREATE TABLE IF NOT EXISTS users ( \
	id INT AUTO_INCREMENT PRIMARY KEY, \
	firstname VARCHAR(255), \
	lastname VARCHAR(255), \
	login VARCHAR(255), \
	pass VARCHAR(255), \
	email VARCHAR(255), \
	sex INT DEFAULT 0, \
	orientation INT DEFAULT 0, \
	bio VARCHAR(255), \
    popularity INT DEFAULT 0 \
    confirm INT DEFAULT 0 )`;
    
 con.query(sql,
 	function (err, result) { if (err) throw err; });
});