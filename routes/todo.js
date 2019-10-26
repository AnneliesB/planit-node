const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');

/* GET home page. */
router.post('/', todosController.create);


router.get('/', todosController.getAll);

module.exports = router;