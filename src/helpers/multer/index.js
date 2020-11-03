const multer = require('multer')
const path = require('path')

const config = {
    storage: multer.diskStorage({

        destination: path.resolve(__dirname, '..', '..', '..', 'public'),

        filename: (req, file, cb) => {

            const fileExtension = path.extname(file.originalname)
            const fileName = path.basename(file.originalname, fileExtension)
            const currentDate = Date.now()

            cb(null, `${currentDate}-${fileName}${fileExtension}`)

        },

    })
}

const upload = multer(config)

function uploadSingleImage(image_field_name) {

    return upload.single(image_field_name)

}

module.exports = uploadSingleImage