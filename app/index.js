import dotenv from 'dotenv/config'
import express from 'express'
import api from 'config/api'

export default api(express())
