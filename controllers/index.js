const router = require('express').Router();


const auth = require('./web/auth');

router.use(auth);


module.exports = router;
