// setup codes generated by command: `npx express-generator api`
let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('test');
});

module.exports = router;