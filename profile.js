if (typeof ssn.profile === undefined)
    res.render('login.ejs', {css: css, error: 'Please login to access your profile page'});
else {
   
    if (req.body.edit && req.body.general === 'modifyuser')
    {
    	if (!req.body.changement)
    		res.render('profile.ejs', {css: css, error: 'Please input something to edit your profile', profile: ssn.profile})
    	var change = eschtml(req.body.changement)
    	if (req.body.edit === '1')
    	{
    		sql = 'SELECT * FROM `users` WHERE login = ?'
    		con.query(sql, [change], function (err, result) { if (err) throw err; 
	    		if (result.length === 0)
	    		{
		    		sql = 'UPDATE users SET login = ? WHERE id = ?'
					con.query(sql, [change, ssn.profile.id], function (err) { if (err) throw err; });
					ssn.profile.login = change;
					res.render('profile.ejs', {css: css, error: 'none', profile: ssn.profile});
				}
				else
					res.render('profile.ejs', {css: css, error: 'Sorry, this login already exists', profile: ssn.profile});
			});
    	}
    	else if (req.body.edit === '2')
    	{
    		sql = 'UPDATE users SET firstname = ? WHERE id = ?'
			con.query(sql, [change, ssn.profile.id], function (err) { if (err) throw err; });
			ssn.profile.firstname = change;
			res.render('profile.ejs', {css: css, error: 'none', profile: ssn.profile});
    	}
    	else if (req.body.edit === '3')
    	{
    		sql = 'UPDATE users SET lastname = ? WHERE id = ?'
			con.query(sql, [change, ssn.profile.id], function (err) { if (err) throw err; });
			ssn.profile.lastname = change;
			res.render('profile.ejs', {css: css, error: 'none', profile: ssn.profile});
    	}
    	else if (req.body.edit === '4')
    	{
    		regLow = /[a-z]/; regUp = /[A-Z]/;
    		if (change.length < 5)
            {
            	res.render('profile.ejs', {css: css, error: 'Password must be at least 6 characters long', profile: ssn.profile});
            }
            if (!change.search(regLow)) 
            {
            	res.render('profile.ejs', {css: css, error: 'Password must contain a lowercase', profile: ssn.profile});
            }
            if (change.search(regUp) === -1) 
            {
            	res.render('profile.ejs', {css: css, error: 'Password must contain an uppercase', profile: ssn.profile});
            }
            bcrypt.hash(change, 10, function(err, hash) { if (err) throw err;
          	sql = 'UPDATE users SET pass = ? WHERE id = ?'
			con.query(sql, [hash, ssn.profile.id], function (err) { if (err) throw err; });
			ssn.profile.pass = hash;
			res.render('profile.ejs', {css: css, error: 'none', profile: ssn.profile}); });
    	}
    	else if (req.body.edit === '5')
    	{
    		if (!validator.isEmail(change))
    			res.render('profile.ejs', {css: css, error: 'Email must be valid', profile: ssn.profile});
    		sql = 'SELECT * FROM `users` WHERE email = ?'
    		con.query(sql, [change], function (err, result) { if (err) throw err; 
	    		if (result.length === 0)
	    		{
		    		sql = 'UPDATE users SET email = ? WHERE id = ?'
					con.query(sql, [change, ssn.profile.id], function (err) { if (err) throw err; });
					ssn.profile.email = change;
					res.render('profile.ejs', {css: css, error: 'none', profile: ssn.profile});
				}
				else
					res.render('profile.ejs', {css: css, error: 'Sorry, this email already exists', profile: ssn.profile});
			});
    	}
    }
    if (req.body.orientation && req.body.sub_orientation === 'modify')
    {
    	console.log(req.body.orientation)
    }
 }