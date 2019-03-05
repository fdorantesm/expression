import dotenv from 'dotenv/config'
import express from 'express'
import api from 'core/api'
import env from 'env'
import loader from 'loader'

export default api(express())
