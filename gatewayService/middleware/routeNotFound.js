const path = require('path');

module.exports = (req, res, next) => {
  if (req.accepts('html')) {
		res.status(404).sendFile(path.resolve(__dirname, '../static/404notfound.html'));
    return;
  } 
  if (req.accepts('json')) {
    res.status(404).send({ error: 'Not Found' });
    return;
  } 	  
}
