import Router from 'router'
import TestController from 'controller/test'

const router = Router()

router.get('/hello', TestController.hello)

export default router