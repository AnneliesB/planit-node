const express = require('express');
const router = express.Router();
const listController = require('../controllers/lists');

/* GET home page. */
router.post('/', listController.create);
router.get('/', listController.getAll);
router.put('/', listController.put);
module.exports = router;