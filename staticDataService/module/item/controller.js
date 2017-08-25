const handler = require('./handler');

module.exports = {
  getItemList: (req, res, next) => {
    handler.getItemList()
      .then((response) => {
        res.status(200).send(response);
        next()
      })
      .catch((err) => {
        next(err)
      })
  }  
}
