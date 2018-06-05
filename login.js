if (req.body.login && req.body.pass)
    {
                 bcrypt.hash(req.body.pass, 10, 
                function(err, hash) { 
                    if (err) throw err;
                 sql = 'SELECT * FROM `users` WHERE login = ? AND pass = ?';
                 variables = [req.body.login, hash];
                 con.query(sql, variables,
                 function (err, res) { 
                    if (err) throw err;
                    if (res.length > 0)
                        res.render('login.ejs', {css: css, success: 'BRAVO TU ES CONNECTÉ !'});
                    else
                        res.render('login.ejs', {css: css, error: 'ERREUR DE CONNEXION !'});
                });
             });

    }
else
    res.render('login.ejs', {css: css, error: 'Filling in Every field is required'});