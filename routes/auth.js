const router = require('express').Router()
const cookieParser = require('cookie-parser')
const {login,register,logout,refreshToken,CompleteRegistration} = require('../controllers/auth')
router.use(cookieParser())


//register route
router.route('/register').post(register)

//login route
router.route('/login').post(login)

//login route
router.route('/logout').post(logout)

//refresh tken
router.route('/refresh_token').post(refreshToken)










module.exports = router
