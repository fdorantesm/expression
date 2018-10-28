import Router from 'router'
import Conekta from 'controller/Conekta'
import Auth from 'middleware/auth'
import { createCard } from 'middleware/conekta'

const router = Router()

router.post('/customer/cards/new', Auth.authenticated, createCard, Conekta.createCard)

export default router