import Router from 'router'
import AuthController from 'controller/Auth'
import middleware from 'middleware/auth'

const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

router.get('/whoami', middleware.authenticated, AuthController.whoami)

export default router
