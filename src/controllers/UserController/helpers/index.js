module.exports = {    

    removePassword(user) {

        if (user.password) {

            user.password = undefined
            return user

        } else {

            return user

        }

    }

}