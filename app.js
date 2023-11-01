const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/weather', (req, res) => {
    const cityName = req.query.city;
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    axios.get(apiUrl)
        .then(response => {
            const weatherData = {
                cityName: response.data.name,
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            };

            res.render('weather', { weatherData });
        })
        .catch(error => {
            res.render('error', { error });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
