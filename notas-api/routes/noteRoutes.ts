const express = require('express')
const noteRoutes = express.Router()

noteRoutes.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
noteRoutes.get('/notes', (req, res) => {
  res.send('About birds')
})

export default noteRoutes