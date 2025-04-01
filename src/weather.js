const apiKey = "d8d914279611af48b3a7d2c3aab51fbb";
let isCelsius = true;
let getWeatherBtn = document.querySelector(".get-weather-btn");
let toggleTemperatureBtn = document.querySelector(".toggle-temperature-btn");

document.addEventListener("DOMContentLoaded", () => {
    getWeather();
});


getWeatherBtn.addEventListener("click", () => {
    let city = document.getElementById("cityInput").value;
    getWeather(city);
});

toggleTemperatureBtn.addEventListener("click", toggleTemperature);

function getWeather(city = "") {
    
    if (!city) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                fetchWeatherData(`lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
            }, error => {
                console.error("Ошибка получения геолокации:", error);
            });
        } else {
            console.error("Геолокация не поддерживается в браузере.");
        }
    } else {
        fetchWeatherData(`q=${city}`);
    }
}

function fetchWeatherData(query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (response.status === 404) {
                throw new Error("Город не найден! Проверьте правильность ввода.");
            }
            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }
            return response.json();
        })
        .then(data => updateUI(data))
        .catch(error => {
            alert(error.message); // Вывести пользователю сообщение
        });
}


function updateUI(data) {
    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

function toggleTemperature() {
    let tempElement = document.getElementById("temperature");
    let currentTemp = parseInt(tempElement.textContent);
    if (isCelsius) {
        tempElement.textContent = `${Math.round(currentTemp * 9/5 + 32)}°F`;
    } else {
        tempElement.textContent = `${Math.round((currentTemp - 32) * 5/9)}°C`;
    }
    isCelsius = !isCelsius;
}
