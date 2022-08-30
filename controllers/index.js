const router = require('express').Router();
const blogs = require('./web/blog');
const auth = require('./web/auth');


// router.use(auth);
router.use(blogs)
router.use(auth)


module.exports = router;

