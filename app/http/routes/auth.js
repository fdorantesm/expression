import Router from 'router'
import Auth from 'controller/Auth'
import middleware from 'middleware/auth'
import app from 'app'

const router = Router()

router.post('/login', Auth.login)

router.get('/whoami', middleware.authenticated, Auth.whoami)

export default router
