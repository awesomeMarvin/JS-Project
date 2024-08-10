const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '917b4ced3f4622cac803fb7a7208e3ff';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') {
        console.log('City name is empty');
        return;
    }

    console.log('City name:', city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${APIKey}`)
        .then(response => {
            return response.json();
        })
        .then(json => {

            if(json.cod == '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            console.log('Weather data:', json);

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const pressure = document.querySelector('.weather-details .pressure span');

            if (image && temperature && description && humidity && wind) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Drizzle':
                        image.src = 'images/drizzle.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Thunderstorm':
                        image.src = 'images/thunderstorm.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        switch (json.weather[0].description) {
                            case 'few clouds':
                            case 'scattered clouds':
                                image.src = 'images/cloud.png';
                            break;
                            case 'broken clouds':
                            case 'overcast clouds':
                                image.src = 'images/broken clouds.png';
                            break;
                        }
                        break;
                    case 'Mist':
                    case 'Fog':
                        image.src = 'images/mist.png';
                        break;
                    default:
                        image.src = 'images/haze.png';
                }

                temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;
                pressure.innerHTML = `${json.main.pressure} hPa`;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
