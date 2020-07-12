const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=227dcab59956b0c2f3bae2cfce1e6ca9&query=' + latitude +',' + longitude + '&units=f'
    // const url = 'http://api.weatherstack.com/current?access_key=227dcab59956b0c2f3bae2cfce1e6ca9&query=-37.840935,144.946457&units=f'

    request({url, json: true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to weather services', undefined)            
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            data = body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. ' + 'The wind speed is ' + body.current.wind_speed
            callback(undefined, data)
        }
    })
}

module.exports = forecast