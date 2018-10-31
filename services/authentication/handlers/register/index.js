'use strict'

var express = require('express');
var router = express.Router();

router.get('/', require('./logic/post'));

module.exports = router;