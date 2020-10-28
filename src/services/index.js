const mongoose = require('mongoose')

module.exports = {
    connectToDatabase(mongo_url) {

        mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }, () => console.log('Connected to Database'))

    }
}