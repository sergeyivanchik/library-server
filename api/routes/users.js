const router = require('express').Router();
const userController = require('../controllers/users.js');
const passport = require('passport');


router.route("/signup")
  .post(userController.signup)

router.route("/login")
  .post(userController.login)

router.route('/checkUser')
  .post(passport.authenticate('jwt', { session: false }), userController.checkUser);

module.exports = router;
