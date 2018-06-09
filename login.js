if (req.body.login && req.body.pass)
{
    sql = 'SELECT * FROM `users` WHERE login = ?';
    variables = [req.body.login];
    con.query(sql, variables,
    function (err, result) { if (err) throw err;
       if (result.length > 0)
       {
           bcrypt.compare(req.body.pass, result[0].pass, function(err, reso) 
           {
               if (reso)
               {
                   if (result[0].confirm === 1)
                   {
                        ssn = req.session;
                        ssn.profile = result[0];
                       res.render('login.ejs', {css: css, success: 'BRAVO TU ES CONNECTÉ !'});
                   }
                   else
                       res.render('login.ejs', {css: css, error: 'Veuillez confirmer votre compte par email'});
               }
               else
                   res.render('login.ejs', {css: css, error: 'ERREUR DE CONNEXION ! (invalid pass)'});
           });
       }
       else
       {
           res.render('login.ejs', {css: css, error: 'ERREUR DE CONNEXION ! (login inconnu)'});
       }
    });
}
else
    res.render('login.ejs', {css: css, error: 'Filling in Every field is required'});