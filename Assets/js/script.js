var cityInputEl = document.getElementById("city");

var getWeatherConditions = function(city){
    var locationLimit = 1;
    
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

    fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&limit=' + locationLimit + '&appid=8a42d43f7d7dc180da5b1e51890e67dc')
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        
    })
    
    
}



var displayCurrentConditions = function (city, data) {
    var currentHeader = document.getElementById("current-header");
    currentHeader.textContent = "Displaying Current Weather for: " + city.toUpperCase();

    var currentContainer = document.getElementById("current-weather");
    var currentConditions = document.createElement("ul");
    currentConditions.className = ".current-conditions-list";
    currentContainer.appendChild(currentConditions);

    var currentIcon = document.createElement("li");
    currentConditions.appendChild(currentIcon);
    currentIcon.textContent = data.current.weather.icon; //<<< figure out how to put weather icon 
    
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
// var displayForecast = function

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    // get value from input element
    var cityName = cityInputEl.value.toLowerCase().trim();
    console.log(cityName);
    if (cityName) {
        // pass cityName to getWeatherConditions function
        getWeatherConditions(cityName);

        // clear old content
        cityInputEl.value = "";
    } else {
         //alert("Error: Please Enter a Valid City.");
    };
};















var searchedCity = document.querySelector("#search-form");

searchedCity.addEventListener("click", formSubmitHandler);
