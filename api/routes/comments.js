const router = require('express').Router();
const commentController = require('../controllers/comments');
const passport = require('passport');


router.route("/")
  .post(passport.authenticate('jwt', { session: false }), commentController.addComment)

router.route("/:bookId")
  .get(commentController.getCommentsByBook)

module.exports = router;
