const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addConfiguration = (configuration) => {
    const myConfiguration = new Model(configuration)
    myConfiguration.save()
}

getConfiguration = async (filterConfiguration) => {
    let filter = {};
    if (filterConfiguration != null) {
        filter = { _id: filterConfiguration };
    }
    const configuration = await Model.find(filter)
    return configuration
}

updateConfiguration = async (idConfiguration, dailyActivity, socialLinks, Links) => {
    const foundConfiguration = await Model.findOne({
        _id: idConfiguration
    });

    foundConfiguration.dailyActivity = dailyActivity;
    foundConfiguration.socialLinks = socialLinks;
    foundConfiguration.Links = Links;

    const newConfiguration = await foundConfiguration.save()
    return newConfiguration
}

deleteConfiguration = (idConfiguration) => {
    return Model.deleteOne({
        _id: idConfiguration
    })
}

module.exports = {
    addConfiguration,
    getConfiguration,
    updateConfiguration,
    deleteConfiguration
}