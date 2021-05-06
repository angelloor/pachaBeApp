var fs = require('fs')

generateFolder = async (IdUser) => {
    var dirUser = `./public/img/challengeUser/${IdUser}`
    if (!fs.existsSync(dirUser)) {
        fs.mkdirSync(dirUser)
    }
}

passImg = async (IdUser, idChallenge) => {
    const oldPath = `./public/img/challengeUser/photoChallengue.jpg`
    const pathDestination = `./public/img/challengeUser/${IdUser}/${idChallenge}.jpg`

    fs.rename(oldPath, pathDestination, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

passImgNew = async (name) => {
    const oldPath = `./public/img/news/image.jpg`
    const pathDestination = `./public/img/news/${name}.jpg`

    fs.rename(oldPath, pathDestination, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

passImgStoreItem = async (name) => {
    const oldPath = `./public/img/storeItem/image.jpg`
    const pathDestination = `./public/img/storeItem/${name}.jpg`

    fs.rename(oldPath, pathDestination, (err) => {
        if (err) {
            console.log(err)
        }
    })
}


module.exports = {
    generateFolder,
    passImg,
    passImgNew,
    passImgStoreItem
}