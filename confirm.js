if (req.query.login && req.query.key)
{
    login = eschtml(req.query.login);
    key = req.query.key;
   
  	sql = 'SELECT * FROM users WHERE login = ? AND confirmkey = ' + req.query.key;
	con.query(sql, [login, key],
    function (error, result)
    { if (error) throw error;
    	if (result.length !== 0)
    	{
    		sql = 'UPDATE users SET confirm = 1 WHERE login = ?';
			con.query(sql, [login], function (err) { if (err) throw err; });
    		res.render('register.ejs', {css: css, error: 'none'});
 		}
		else
    		res.render('register.ejs', {css: css, error: 'Something went wrong, your account was not confirmed'});
    });
}