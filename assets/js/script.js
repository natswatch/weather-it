var apiKey = "acd258a23f8a25de14b21ec2a6e562bc";
var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#city-name");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var day1El = document.querySelector("#day-1");
var day2El = document.querySelector("#day-2");
var day3El = document.querySelector("#day-3");
var day4El = document.querySelector("#day-4");
var day5El = document.querySelector("#day-5");
var currentData = {};
var forecastData = {};

var getCurrentWeather = function(cityName) {

    var currentUrl = "https://api.openweathermap.org/data/2.5/find?q=" + cityName + ",us&units=imperial&APPID=" + apiKey;

    fetch(currentUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayCurrentWeather(data);
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
var displayCurrentWeather = function(weather, city) {
    
    if (weather.length === 0) {
        alert("No city found! Try again.");
        return;
    }

    // TODO: reset elements
    var cityTitleEl = document.createElement("h4");
    var dateUnix = weather.list[0].dt;
    var dateText = "(" + moment.unix(dateUnix).format('MM/DD/YYYY') + ")";
    var weatherMain = weather.list[0];
    cityTitleEl.textContent = weatherMain.name + " " + dateText;
    currentWeatherEl.appendChild(cityTitleEl);

    var imgEl = document.createElement("img");
    var iconId = weatherMain.weather[0].icon;
    imgEl.setAttribute("src", getIconImgUrl(iconId));
    imgEl.setAttribute("width", "50px");
    imgEl.setAttribute("height", "50px");
    cityTitleEl.appendChild(imgEl);
    

    var currentTemp = document.createElement("span")
    currentTemp.textContent = "Temperature: " + Math.round(weatherMain.main.temp) + " °F" ;
    currentWeatherEl.appendChild(currentTemp);

    var currentHumidity = document.createElement("span")
    currentHumidity.textContent = "Humidity: " + weatherMain.main.humidity + " %"  ;
    currentWeatherEl.appendChild(currentHumidity);

    var currentWind = document.createElement("span")
    currentWind.textContent = "Wind Speed: " + weatherMain.wind.speed + " MPH"  ;

    currentWeatherEl.appendChild(currentWind);

    const lat = weatherMain.coord.lat;
    const lon = weatherMain.coord.lon;

    fetchAndDisplayUv(lat, lon);
    
    
};

var fetchAndDisplayUv = function(lat, lon) {

    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;

    fetch(uvUrl)
        .then(function(response){
            response.json().then(function(data){
                var currentUv = document.createElement("span");
                currentUv.textContent = "UV Index: " + data.value;
            
                currentWeatherEl.appendChild(currentUv);
            });
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        });

};

// calls and saves weather data
var getForecast = function(cityName) {

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&units=imperial&APPID=" + apiKey;

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
var displayForecast = function(weather) {
    
    if (weather.length === 0) {
        alert("No city found! Try again.");
        return;
    }

    // TODO: reset elements
    
    // var img = document.createElement("img");
    // var iconId = weather.list[0].weather.icon;
    // img.src = getIconImgUrl(iconId);
    var weatherIndex = 0;
    var weatherMain = weather.list[0];
    var dateUnix = weatherMain.dt;
    var dateText = "(" + moment.unix(dateUnix).format('MM/DD/YYYY') + ")";
    var dateEl = document.createElement("h5");
    dateEl.textContent = dateText;
    day1El.appendChild(dateEl);

    var imgEl = document.createElement("img");
    var iconId = weatherMain.weather[0].icon;
    imgEl.setAttribute("src", getIconImgUrl(iconId));
    imgEl.setAttribute("width", "50px");
    imgEl.setAttribute("height", "50px");
    day1El.appendChild(imgEl);

    var temp = document.createElement("span")
    temp.textContent = "Temp: " + Math.round(weatherMain.main.temp) + " °F" ;

    day1El.appendChild(temp);

    var humid = document.createElement("span")
    humid.textContent = "Humidity: " + weatherMain.main.humidity + " %" ;

    day1El.appendChild(humid);

    var temp = document.createElement("span")
    temp.textContent = "Temp: " + Math.round(weatherMain.main.temp) + " °F" ;

    day2El.appendChild(temp);

    var humid = document.createElement("span")
    humid.textContent = "Humidity: " + weatherMain.main.humidity + " %" ;

    day2El.appendChild(humid);

};
var getIconImgUrl = function(iconId) {
    return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
}

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
        getForecast(cityName);
    } else {
        alert("Please enter the name of a city!");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);