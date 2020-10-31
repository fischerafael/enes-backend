const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { connectToDatabase } = require('./services')
const routes = require('./routes')

const PORT = process.env.PORT || process.env.LOCAL_PORT

connectToDatabase(process.env.MONGO_URL)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'))
app.use(routes)

app.listen(PORT, console.log(`Server running on port ${PORT}`))
