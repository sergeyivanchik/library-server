const router = require('express').Router();
const bookController = require('../controllers/books');
const passport = require('passport');


router.route("/")
  .get(bookController.getBooks)
  .post(bookController.addBook)

router.route("/:id")
  .get(bookController.getCurrentBook)

router.route("/author/:authorId")
  .get(bookController.getBooksByAuthor)

// router.route("/:bookId/:followerId")
//   .get(bookController.setFollower)


module.exports = router;
