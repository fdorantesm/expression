import dotenv from 'dotenv/config'
import express from 'express'
import api from 'config/api'

const app = express()

export default api(app)
