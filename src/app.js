// const express = require('express')

// const app = express()

// app.get('', (req, res) => {
//     res.send('Hello v')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page.')
// })

// app.get('/about', (req, res) => {
//     res.send('About app page')
// })

// app.get('/weather', (req, res) => {
//     res.send('See weather')
// })

// app.com
// app.com/help 
// app.com/about
// cntl C for shutdown server

// give path of directory or folder and file name
// console.log(__dirname)
// console.log(__filename)

///////////////////////////////////

// const express = require('express')

// const path = require('path')

// const app = express()
// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Vipin',
//         age: 27
//     }, {
//         name: 'Yadav',
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About the app.</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Forecast is 26 degrees',
//         location: 'Delhi'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

/////////////////////////////

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
// in default its views name folder if its diff then we describe path
const viewsPath =path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// for index.hbs in view
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vipin'
    })
})

// for about.hbs in view
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather',
        name: 'Node.js'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "There's no help here",
        title: "Help",
        name: 'Vipin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'Please enter a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude,location} = {} ) =>{
        if (error) {
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'It is Clear',
    //     location: 'Delhi',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'Please Enter a Search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render( '404', {
        title: '404',
        name: "Vipin",
        errorMessage: 'Page not Found'
    })
})

// * is for everything that is not listed above help,about etc.
app.get('*', (req, res) => {
    res.render( '404', {
        title: '404',
        name: 'Vipin',
        errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})