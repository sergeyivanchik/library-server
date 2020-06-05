const router = require('express').Router();


router.use('/books',require('./books'));
router.use('/authors',require('./authors'));
router.use('/users', require('./users'));
router.use('/selectedBooks', require('./selectedBooks'));

module.exports = router;
