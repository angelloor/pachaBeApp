const fecha = require('./Date')

getAge = (birdOfDate) => {
    const now = fecha.getDate()
    const arrayBirdOfDate = birdOfDate.split('-')
    const arrayNow = now.split('-')

    const dn = arrayBirdOfDate[0], mn = arrayBirdOfDate[1], an = arrayBirdOfDate[2]
    const da = arrayNow[0], ma = arrayNow[1], aa = arrayNow[2]

    let edad = aa - an
    let isBirthday = false

    if ((ma < mn) || (ma == mn) && (da < dn)) {
        edad--
    }

    if ((ma == mn) && (da == dn)) {
        isBirthday = true
    }
    return { edad, isBirthday }
}

module.exports = {
    getAge
}