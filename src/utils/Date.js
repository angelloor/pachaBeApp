getDate = () => {
    const date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() + 1
    let anio = date.getFullYear()
    if (dia <= 9) {
        dia = `0${dia}`
    }
    if (mes <= 9) {
        mes = `0${mes}`
    }
    const dateActuallity = `${dia}-${mes}-${anio}`
    return dateActuallity
}

getFullDate = () => {
    const date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() + 1
    let anio = date.getFullYear()
    let hora = date.getHours()
    let minutos = date.getMinutes()

    if (dia <= 9) {
        dia = `0${dia}`
    }
    if (mes <= 9) {
        mes = `0${mes}`
    }
    if (hora <= 9) {
        hora = `0${hora}`
    }
    if (minutos <= 9) {
        minutos = `0${minutos}`
    }
    const dateActuallity = `${dia}-${mes}-${anio} ${hora}:${minutos}`
    return dateActuallity
}

module.exports = {
    getDate,
    getFullDate
}