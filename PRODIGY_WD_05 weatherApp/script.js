document.getElementById('search-button').addEventListener('click', fetchWeather);
const cities = ["New York", "London", "Tokyo"];

async function fetchWeather() {
    const location = document.getElementById('location-input').value;
    getWeather(location);
}

async function getWeather(location) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3d2fed1aa3msh1d2488ac657fa0dp140bbbjsn48e4e11b35cd',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displayWeather(result);
    } catch (error) {
        console.error(error);
        alert('Could not fetch weather data. Please try again.');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.querySelector('.location').textContent = `Location: ${data.location.name}, ${data.location.region}, ${data.location.country}`;
    weatherInfo.querySelector('.temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
    weatherInfo.querySelector('.condition').textContent = `Condition: ${data.current.condition.text}`;
}

async function updateCityWeather(city, tempElement, conditionElement) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3d2fed1aa3msh1d2488ac657fa0dp140bbbjsn48e4e11b35cd',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        tempElement.textContent = `${result.current.temp_c}°C`;
        conditionElement.textContent = result.current.condition.text;
    } catch (error) {
        console.error(error);
        tempElement.textContent = "--°C";
        conditionElement.textContent = "--";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cityRows = document.querySelectorAll('tr[data-city]');
    cityRows.forEach(row => {
        const city = row.getAttribute('data-city');
        const tempElement = row.querySelector(`.${city.toLowerCase().replace(/\s/g, '-')}-temp`);
        const conditionElement = row.querySelector(`.${city.toLowerCase().replace(/\s/g, '-')}-condition`);
        updateCityWeather(city, tempElement, conditionElement);
    });
});
