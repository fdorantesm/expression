import dotenv from 'dotenv/config'
import express from 'express'
import api from 'config/api'
import env from 'env'

export default api(express())
