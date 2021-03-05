const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getLatLng = require('./utils/geocode.js');
const getWeatherData = require('./utils/weatherstack.js');

const app = express();
const port = process.env.PORT || 3000;

//define paths for config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up configuration for hbs engine and views path
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directory to serve - includes styles.css and script.js
app.use(express.static(publicDirectoryPath));

//Render hbs
app.get('', (req,res)=> {
  res.render('index', {
    title: 'Weather App',
    author: 'Winston',
  });
})
app.get('/about', (req,res)=> {
  res.render('about', {
    title: 'About me',
    author: 'Winston'
  });
})
app.get('/help', (req,res)=> {
  res.render('help', {
    title: 'Frequently asked questions',
    author: 'Winston',
    helpMessage: 'What is HBS?'
  });
})

app.get('/weather', (req,res) => {
  if (!req.query.address) {
		return res.send({
			error: 'You must provide an address search term',
		});
	}
  getLatLng(req.query.address, (error, geoData)=> {
    if (error) {
      return res.send({error});
    }
    getWeatherData(geoData, (error, weatherData) => {
      if(error) {
        return res.send({error});
      }
      res.send({
        location: geoData.location,
        weatherData,
      })
    });
  });
})


app.get('/help/*', (req,res)=>{
	res.render('404', {
    title: '404',
    author: 'Winston',
    errorMessage: 'Article Not Found'
  });
}) 

app.get('*', (req,res)=>{
	res.render('404', {
    title: '404',
    author: 'Winston',
    errorMessage: 'Page Not Found'
  });
}) 

app.listen(port, ()=> {
  console.log(`Node has started at ${port}`);
});