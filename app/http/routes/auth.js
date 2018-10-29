import Router from 'router'
import AuthController from 'controller/Auth'
import middleware from 'middleware/auth'
import app from 'app'

const router = Router()

router.post('/login', AuthController.login)

router.get('/whoami', middleware.authenticated, AuthController.whoami)

export default router
