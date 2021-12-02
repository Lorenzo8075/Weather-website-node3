const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=edfe94e8efaf32e3d4e6426ea1bb2405&query=' + longitude + ',' + latitude + '&units=f'
    request({ url: url, json: true }, (error, response) => { //request({ url, json: true }, (error, {body}}) =>
        if (error) {
            callback('Unable to connect to location services!', undefined) //no need to declare undefined
        } else if (response.body.error) { //(body.error)
            console.log(response.body.error)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out. But feels like " + response.body.current.feelslike + " degrees out.")
        } //when we deconstruct then we remove response. before accessing the data
    })
}

module.exports = forecast