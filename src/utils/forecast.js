const chalk = require('chalk')
const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=735b180bee3b843416b35f2a0100c217&query=' + latitude +','+ longitude + '&units=f'

    request({url, json: true}, (error,{body}) => {
        // console.log(response)
        const temp =  ((body.current.temperature - 32)*5/9).toFixed(1)
        const temp1 = ((body.current.feelslike -32)*5/9).toFixed(1) 
        if (error) {
            callback('Unable to connect to weather server!'), undefined
        } else if (body.error) {
            callback('Unable to find location!'), undefined
        } else {
            // callback(undefined, "It's "+ body.current.weather_descriptions[0] + " outside, Temprature is currently " + temp + " degree celsius outside. It feels like " + temp1 +' degrees.' )
            // callback(undefined, "It's "+ body.current.weather_descriptions[0] + "\n outside." )
            // callback( "Temprature is currently " + temp + " degree celsius outside and it feels like " + temp1 +' degrees.'  )
        }
    })
}

module.exports = forecast