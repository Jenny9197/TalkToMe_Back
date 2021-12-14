const express = require('express');
const router = express.Router(); // 라우터라고 선언한다.
const { searchControllers } = require('../controllers');

router.post('/', searchControllers);

module.exports = router;