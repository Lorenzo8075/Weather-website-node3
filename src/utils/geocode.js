const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm9uZWJ1c2luZXNzIiwiYSI6ImNrd2JjcjdxeDJiOTIyeWxqZGFiMzdyODAifQ.rV_1KzaQ9NuVrnYRpzdDoQ&limit=1'
        //encodeURIComponent(address)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined) //no need to declare undefined
        } else if (response.body.features.length === 0) { //!response.body.features || 
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode