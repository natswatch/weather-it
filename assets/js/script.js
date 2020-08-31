var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#city-name");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var currentData = {};
var forecastData = {};


var getCurrentWeather = function(cityName) {

    var currentUrl = "https://api.openweathermap.org/data/2.5/find?q=" + cityName + ",us&units=imperial&APPID=acd258a23f8a25de14b21ec2a6e562bc";

    fetch(currentUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
};


// calls and saves weather data
var getForecast = function(cityName) {

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&units=imperial&APPID=acd258a23f8a25de14b21ec2a6e562bc";

    fetch(forecastUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayForecast(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
};


// displays called weather information
var displayWeather = function(weather, city) {
    
    if (weather.length === 0) {
        alert("No city found! Try again.");
        return;
    }

    // TODO: reset elements
    var cityTitle = document.createElement("h4");
    cityTitle.textContent = weather.list[0].name;

    currentWeatherEl.appendChild(cityTitle);
};

var addSearchItem = function(city) {
    // adds last searched city to history
    var searchItem = document.createElement("li");
    searchItem.classList = "list-group-item";
    searchItem.textContent = city;

    searchHistoryEl.prepend(searchItem);
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityNameInputEl.value.trim();

    if (cityName) {
        getCurrentWeather(cityName);
        addSearchItem(cityName);
        cityNameInputEl.value = "";
    } else {
        alert("Please enter the name of a city!");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);