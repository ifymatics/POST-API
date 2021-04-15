const router = require('express').Router();
const { postController,pingController } = require('../controller/postController');

router.get('/', postController);


module.exports = router;