const path = require('path') //Optional path is a core npm module
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000 //HEROKU port setup 1st part or 3000 to run locally

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Route and render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lorenzo Jiang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lorenzo Jiang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'Useful Information',
        title: 'Help',
        name: 'Lorenzo Jiang'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})





app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lorenzo Jiang',
        errorMessage: 'Help article not found'
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lorenzo Jiang',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
        console.log('Server is up on PORT ' + port)
    }) //Asyncronous