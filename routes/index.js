var express = require('express');
var router = express.Router();
const todosController = require('../controllers/todos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.post('/', todosController.create);
router.get('/', todosController.getAll);
router.put('/', todosController.put);

module.exports = router;