import Router from 'router'
import ConektaController from 'controller/Conekta'
import Auth from 'middleware/auth'
import { createCard, removeCard } from 'middleware/conekta'

const router = Router()

router.post('/customer/cards', Auth.authenticated, createCard, ConektaController.createCard)
router.delete('/customer/cards/', Auth.authenticated, removeCard, ConektaController.removeCard)

export default router