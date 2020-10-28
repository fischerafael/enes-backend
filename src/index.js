const express = require('express')
require('dotenv').config()

const services = require('./services')
const routes = require('./routes')

const PORT = process.env.PORT || process.env.LOCAL_PORT

services.connectToDatabase(process.env.MONGO_URL)

const app = express()

app.use(routes)

app.listen(PORT, console.log(`Server running on port ${PORT}`))
