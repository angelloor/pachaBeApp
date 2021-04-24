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

module.exports = {
    generateFolder,
    passImg
}