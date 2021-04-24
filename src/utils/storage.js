const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/challengeUser')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.jpg')
    }
})

var upload = multer({ storage: storage })

module.exports = upload