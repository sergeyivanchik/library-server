const router = require('express').Router();
const authorController = require('../controllers/authors');


router.route("/")
  .get(authorController.getAuthors)
  .post(authorController.addAuthor)

router.route("/:id")
  .get(authorController.getCurrentAuthor)


module.exports = router;
