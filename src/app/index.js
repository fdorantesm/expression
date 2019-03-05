import dotenv from 'dotenv/config'
import express from 'express'
import api from 'core/api'
import env from 'env'

export default api(express())
