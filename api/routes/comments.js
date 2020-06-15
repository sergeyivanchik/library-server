const router = require('express').Router();
const commentController = require('../controllers/comments');
const passport = require('passport');


router.route("/")
  // .get(bookController.getBooks)
  .post(passport.authenticate('jwt', { session: false }), commentController.addComment)

router.route("/:bookId")
  .get(commentController.getCommentsByBook)

// router.route("/author/:authorId")
//   .get(bookController.getBooksByAuthor)


module.exports = router;
