const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

logger.info('Connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(error => logger.error('Error connecting to MongoDB:', error.message))

app.use(cors())

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    app.use(express.static('../frontend/dist'))
}

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app