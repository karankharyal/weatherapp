const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Set up handlebars engine and views location


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set up static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'karan'
    })
})


app.get('/about', (req,res) => { 
    res.render('about', {
        title: 'About us',
        name: 'karan'
    })
})



app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        help: 'We are on our way to help you',
        name: 'karan'
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
           return res.send({ error })
        } 
       
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({error})
            }
            
         res.send({
             Address: req.query.address,
             Forecast: forecastData,
             location         
            })   
        
    
    
        })
    })

    // res.send({
    //     City: req.query.address,
    //     temp: 'Yet to be linked'
    // })
})


app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404 page',
        error: 'Help article not found'
    })

})

//404 page

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        error: 'This page does not exist'
    })
})


app.listen(3000, () => {
    console.log('server is up on port 3000')
})