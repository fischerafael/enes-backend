const bcrypt = require('bcryptjs')

module.exports = {

    async encryptPassword(password) {

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)

        return encryptedPassword

    }    

}