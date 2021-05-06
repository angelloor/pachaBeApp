const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/challengeUser')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.jpg')
    }
})

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/news')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.jpg')
    }
})

var storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/storeItem')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.jpg')
    }
})

var uploadChallengeUser = multer({ storage: storage })
var uploadNew = multer({ storage: storage2 })
var uploadStoreItem = multer({ storage: storage3 })

module.exports = {
    uploadChallengeUser,
    uploadNew,
    uploadStoreItem
}