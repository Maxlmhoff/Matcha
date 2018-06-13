
if (req.body.table)
{
var table = JSON.parse(req.body.table)

var location = 'Continent : ' + table.continent_name + ' | Country : ' + table.country_name + 
	' | Region : ' + table.region_name + ' | City : ' + table.city + ' | Postal Code : ' + table.zip

con.query('UPDATE users SET location = ? WHERE id = ?', , ssn.profile.id], function (err) { if (err) throw err })
    ssn.profile[column] = change
}