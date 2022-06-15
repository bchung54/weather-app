import _ from 'lodash';
import './style.css';

const forecast = document.querySelector('.forecast');
const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
	const userInput = document.querySelector('#search-input');
	const begin = Date.now();
	getData(userInput.value).then((response) => {
		const responseTime = Date.now() - begin;
		document.getElementById('load-time').textContent = `Load time: ${responseTime}ms`;
		document.querySelector('.city').textContent = `${response.name}, ${response.country}`;
		document.querySelector('.temp').textContent = `${parseInt(response.temp)} \xBAF`;
		document.querySelector('img').src = selectImage(response.id);
		document.querySelector('.desc').textContent =
			response.description.charAt(0).toUpperCase() + response.description.slice(1);
		document.querySelector('.humidity').textContent = `Humidity: ${response.humidity}%`;
		document.querySelector('.wind').textContent = `Wind: ${response.windSpd}mph ${translateWind(
			response.windDir
		)}`;
		forecast.style.display = 'flex';
		forecast.style.animation = '1.2s display';
		form.style.animation = '1s moveSearch';
		form.classList.add('moved');
	});
	e.preventDefault();
});

const weatherUrl = 'http://api.openweathermap.org/data/2.5';
function getData(searchTerm) {
	return fetch(
		`${weatherUrl}/weather?q=${searchTerm}&appid=46de3c40c3fe17c18fdaf85a350ee08a&units=imperial`,
		{
			mode: 'cors',
		}
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			const name = data.name;
			const country = data.sys.country;
			const temp = data.main.temp; // Fahrenheit
			const id = data.weather[0].id; // weather condition code
			const humidity = data.main.humidity; // %
			const description = data.weather[0].description;
			const windSpd = data.wind.speed; // mph
			const windDir = data.wind.deg; // deg
			return { name, country, temp, id, description, humidity, windSpd, windDir };
		})
		.catch(function (error) {
			console.log(error);
		});
}

function translateWind(degrees) {
	const step = 11.25;
	if (_.inRange(degrees, 0, step) || _.inRange(degrees, step * 31, 360)) {
		return 'N';
	} else if (_.inRange(degrees, step, step * 3)) {
		return 'NNE';
	} else if (_.inRange(degrees, step * 3, step * 5)) {
		return 'NE';
	} else if (_.inRange(degrees, step * 5, step * 7)) {
		return 'ENE';
	} else if (_.inRange(degrees, step * 7, step * 9)) {
		return 'E';
	} else if (_.inRange(degrees, step * 9, step * 11)) {
		return 'ESE';
	} else if (_.inRange(degrees, step * 11, step * 13)) {
		return 'SE';
	} else if (_.inRange(degrees, step * 13, step * 15)) {
		return 'SSE';
	} else if (_.inRange(degrees, step * 15, step * 17)) {
		return 'S';
	} else if (_.inRange(degrees, step * 17, step * 19)) {
		return 'SSW';
	} else if (_.inRange(degrees, step * 19, step * 21)) {
		return 'SW';
	} else if (_.inRange(degrees, step * 21, step * 23)) {
		return 'WSW';
	} else if (_.inRange(degrees, step * 23, step * 25)) {
		return 'W';
	} else if (_.inRange(degrees, step * 25, step * 27)) {
		return 'WNW';
	} else if (_.inRange(degrees, step * 27, step * 29)) {
		return 'NW';
	} else if (_.inRange(degrees, step * 29, step * 31)) {
		return 'NNW';
	} else {
		return degrees;
	}
}

function selectImage(id) {
	const code = id.toString();
	const forecast = document.querySelector('.forecast');
	switch (parseInt(code[0])) {
		case 2: // Thunderstorm
			forecast.style.backgroundColor = 'darkslategray';
			return '../src/images/icons/thunder-octopocto.png';
		case 3: // Drizzle
			forecast.style.backgroundColor = 'gray';
			return '../src/images/icons/drizzle-lutifx.png';
		case 5: // Rain
			forecast.style.backgroundColor = 'gray';
			return '../src/images/icons/rain-freepik.png';
		case 6: // Snow
			forecast.style.backgroundColor = 'white';
			return '../src/images/icons/snowfall-andy-horvath.png';
		case 7: // Fog
			forecast.style.backgroundColor = 'gray';
			return '../src/images/icons/fog-freepik.png';
		case 8:
			if (id == 800) {
				forecast.style.backgroundColor = 'lightblue';
				return '../src/images/icons/sun-stasy.png';
			}
			forecast.style.backgroundColor = 'white';
			return '../src/images/icons/cloudy-day-kosonicon.png';
		default:
			return;
	}
}
