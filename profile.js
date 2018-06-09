if (typeof ssn.profile == undefined)
    res.render('login.ejs', {css: css, error: 'Please login to access your profile page'})
// cette fonction serra utile partout sur cette page!!! je suis un genie, en plus elle tiens sur 4 lignes ;)
function updateuser(column, change)
{
    var sql = 'UPDATE users SET ' + column + ' = ? WHERE id = ?'
    con.query(sql, [change, ssn.profile.id], function (err) { if (err) throw err })
    ssn.profile[column] = change
    res.render('profile.ejs', {css: css, success: 'Your ' + column + ' was successfully changed', profile: ssn.profile})
}

if (req.body.edit && req.body.general === 'modifyuser')
{
	if (req.body.changement == '' || req.body.changement.length <= '1' || typeof req.body.changement == undefined )
		res.render('profile.ejs', {css: css, error: 'Please input something to edit your profile', profile: ssn.profile})
    
    var change = eschtml(req.body.changement)
    if (change !== eschtml(req.body.confirm))
        res.render('profile.ejs', {css: css, error: 'Your input and confirmation were different', profile: ssn.profile})

	if (req.body.edit === '1')
	{
		sql = 'SELECT * FROM `users` WHERE login = ?'
		con.query(sql, [change], function (err, result) { if (err) throw err 
    		if (result.length === 0)
	    		updateuser('login', change)
			else
				res.render('profile.ejs', {css: css, error: 'Sorry, this login already exists', profile: ssn.profile})
		})
	}
	else if (req.body.edit === '2')
        updateuser('firstname', change)
	else if (req.body.edit === '3')
		updateuser('lastname', change)
	else if (req.body.edit === '4')
	{
		regLow = /[a-z]/ 
        regUp = /[A-Z]/
		if (change.length < 5)
        	res.render('profile.ejs', {css: css, error: 'Password must be at least 6 characters long', profile: ssn.profile})
        else if (change.search(regLow) === -1) 
        	res.render('profile.ejs', {css: css, error: 'Password must contain a lowercase', profile: ssn.profile})
        else if (change.search(regUp) === -1) 
        	res.render('profile.ejs', {css: css, error: 'Password must contain an uppercase', profile: ssn.profile})
        else
        {
            bcrypt.hash(change, 10, function(erroo, hash) { if (erro) throw erro
          	updateuser('pass', hash)
            })
        }
	}
	else if (req.body.edit === '5')
	{
		if (validator.isEmail(change))
        {
    		sql = 'SELECT * FROM `users` WHERE email = ?'
    		con.query(sql, [change], function (err, result) { if (err) throw err 
        		if (result.length === 0)
    	    		updateuser('email', change)
    			else
    				res.render('profile.ejs', {css: css, error: 'Sorry, this email already exists', profile: ssn.profile})
    		})
        }
        else
            res.render('profile.ejs', {css: css, error: 'Email must be valid', profile: ssn.profile})
	}
}


if (req.body.orientation && req.body.sub_orientation === 'modify')
{
	console.log(req.body.orientation)
}

