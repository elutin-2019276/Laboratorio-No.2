'use strict'
import express from 'express'
import { test, registro, login, update, deleteU } from './animal.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/registro', registro)
api.post('/login', login)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)
export default api