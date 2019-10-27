var express = require('express');
var router = express.Router();
let listItemController = require('../controllers/listitem');

router.get('/', listItemController.get);
router.put('/', listItemController.put);
router.post('/', listItemController.post);

module.exports = router;