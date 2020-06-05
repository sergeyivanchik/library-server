const router = require('express').Router();
const selectedBooksController = require('../controllers/selectedBooks');
const passport = require('passport');


router.route("/:userId/:bookId")
  .get(selectedBooksController.checkSelectedBook)
  .put(selectedBooksController.addBook)

module.exports = router;
