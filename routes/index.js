var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/lists', function(req, res, next) {
  res.render('lists');
});

module.exports = router;
