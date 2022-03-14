const router = require('express').Router();

const { logInController, signUpController }  = require('../controllers/authController')

router.post('/auth/login', logInController );
router.post('/auth/signup', signUpController )


module.exports = router;