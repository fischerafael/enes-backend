const apiURL = process.env.API_ADDRESS

module.exports = {

    createUrlFromFileName(filename) {

        const imgUrl = `${apiURL}/public/${filename}`
        
        return imgUrl

    }

}