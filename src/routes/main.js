// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.use('/', mainController.index); 
router.use('/search', mainController.search); 

module.exports = router;
