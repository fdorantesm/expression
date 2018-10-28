import Router from 'router'
import Conekta from 'controller/Conekta'
import Auth from 'middleware/auth'
import { createCard, removeCard } from 'middleware/conekta'

const router = Router()

router.post('/customer/cards', Auth.authenticated, createCard, Conekta.createCard)
router.delete('/customer/cards/', Auth.authenticated, removeCard, Conekta.removeCard)

export default router