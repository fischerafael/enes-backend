module.exports = {

    validateOnwership(data) {

        const { reqBodyId, tokenId } = data

        if (reqBodyId !== tokenId) return false

        return true

    }

}