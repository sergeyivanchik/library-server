const router = require('express').Router();
const bookController = require('../controllers/books');
const passport = require('passport');


router.route("/")
  .get(bookController.getBooks)
  .post(bookController.addBook)

router.route("/:id")
  .get(passport.authenticate('jwt', { session: false }), bookController.getCurrentBook)

router.route("/author/:authorId")
  .get(bookController.getBooksByAuthor)

router.route("/getRating/:bookId/:userId")
  .post(bookController.getBookRating)

module.exports = router;
