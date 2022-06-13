import _ from 'lodash';
import './style.css';

const content = document.querySelector('.content');
const form = document.querySelector('form');
const apiKey = '46de3c40c3fe17c18fdaf85a350ee08a';
form.addEventListener('submit', function (e) {
	const userInput = document.querySelector('#search-input');
	getData(userInput.value).then((response) => {
		document.querySelector('.city').textContent = `${response.name}, ${response.country}`;
		document.querySelector('.temp').textContent = `${parseInt(response.temp)} \xBAF`;
		document.querySelector('.desc').textContent = response.description.toUpperCase();
		document.querySelector('.humidity').textContent = `Humidity: ${response.humidity}%`;
		document.querySelector('.wind').textContent = `Wind: ${response.windSpd}mph ${translateWind(response.windDir)}`;
		// console.log(response);
		form.reset();
	});
	e.preventDefault();
});

/* async function weatherInfo(userInput) {
	let result = await getData(userInput);
	console.log(result);
	return result;
} */

const weatherUrl = 'http://api.openweathermap.org/data/2.5';
function getData(searchTerm) {
	return fetch(`${weatherUrl}/weather?q=${searchTerm}&appid=${apiKey}&units=imperial`, { mode: 'cors' })
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			const name = data.name;
			const country = data.sys.country;
			const temp = data.main.temp; // Fahrenheit
			const humidity = data.main.humidity; // %
			const description = data.weather[0].description;

			const windSpd = data.wind.speed; // mph
			const windDir = data.wind.deg; // deg
			return { name, country, temp, humidity, description, windSpd, windDir };
		})
		.catch(function (error) {
			console.log(error);
		});
}

function translateWind(degrees) {
	const step = 11.25;
	if (_.inRange(degrees, 0, step) || _.inRange(degrees, step * 31, 360)) {
		return 'North';
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
		return 'error';
	}
}
// getData.then((response) => console.log(response));
