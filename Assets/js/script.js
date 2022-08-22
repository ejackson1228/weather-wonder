var cityInputEl = document.getElementById("city");
var locationLimit = 1;

var getWeatherConditions = function(city){
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&limit=' + locationLimit + '&appid=8a42d43f7d7dc180da5b1e51890e67dc')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=8a42d43f7d7dc180da5b1e51890e67dc`)
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // send city & it's data to display current conditions function
        displayCurrentConditions(city, data);
        
    });
}

var getFutureConditions = function(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&limit=' + locationLimit + '&appid=8a42d43f7d7dc180da5b1e51890e67dc')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=8a42d43f7d7dc180da5b1e51890e67dc`)
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //send city & data to displayForecast
        displayForecast(city, data);
    });
};

var displayCurrentConditions = function (city, data) {
    var currentHeader = document.getElementById("current-header");
    currentHeader.textContent = "Displaying Current Weather for: " + city.toUpperCase();

    var currentContainer = document.getElementById("current-weather");
    var currentConditions = document.createElement("ul");
    currentConditions.className = ".current-conditions-list";
    currentContainer.appendChild(currentConditions);

    var currentIcon = document.createElement("li");
    currentConditions.appendChild(currentIcon);
    currentIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png' class='current-weather-icon'>"; //<<< figure out how to put weather icon 
    
    var currentDate = document.createElement("li");
    currentConditions.appendChild(currentDate);
    currentDate.textContent = data.current.date; // <<< figure out how to input current date (moment.js?)

    var currentTemp = document.createElement("li");
    currentConditions.appendChild(currentTemp);
    currentTemp.textContent = data.current.temp + "°F";
    
    var currentHumidity = document.createElement("li");
    currentConditions.appendChild(currentHumidity);
    currentHumidity.textContent = data.current.humidity + " kg/m^3";

    var currentWind = document.createElement("li");
    currentConditions.appendChild(currentWind);
    currentWind.textContent = data.current.wind_speed + " MPH";
    
    var currentUVI = document.createElement("li");
    currentConditions.appendChild(currentUVI);
    currentUVI.textContent = data.current.uvi;
    
   



};

var displayForecast = function(city, data) {
    var forecastHeader = document.getElementById("forecast-header");
    forecastHeader.textContent = "Displaying Forecast for: " + city;

    var forecastContainer = document.getElementById("forecast");
    var forecastConditions = document.createElement("ul");
    forecastConditions.className = "forecast-conditions-list";
    forecastContainer.appendChild(forecastConditions);

    var forecastIcon1 = document.createElement("li");
    forecastConditions.appendChild(forecastIcon1);
    forecastIcon1.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png' class='current-weather-icon'>";

    var forecastDate1 = document.createElement("li");
    forecastConditions.appendChild(forecastDate1);
    forecastDate1.textcontent = data.list[5].dt_txt.toString(); // << convert UNIX timestamp to js for date

    var forecastTemp1 = document.createElement("li");
    forecastConditions.appendChild(forecastTemp1);
    forecastTemp1.textContent = data.list[5].main.temp + "°F";

    var forecastHumidity1 = document.createElement("li");
    forecastConditions.appendChild(forecastHumidity1);
    forecastHumidity1.textContent = data.list[5].main.humidity + " kg/m^3";

    var forecastWind1 = document.createElement("li");
    forecastConditions.appendChild(forecastWind1);
    forecastWind1.textContent = data.list[5].wind.speed + " MPH";
};

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    // event.preventDefault();
    // get value from input element
    var cityName = cityInputEl.value.toLowerCase().trim();
    console.log(cityName);
    if (cityName) {
        // pass cityName to getWeatherConditions function
        getWeatherConditions(cityName);
        getFutureConditions(cityName);
        // clear old content
        cityInputEl.value = "";
    } else {
         //alert("Error: Please Enter a Valid City.");
    };
};















var searchedCity = document.querySelector("#search-form");

searchedCity.addEventListener("click", formSubmitHandler);
