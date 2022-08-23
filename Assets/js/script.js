var cityInputEl = document.getElementById("city");
var locationLimit = 1;

var getWeatherConditions = function(city){
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&limit=' + locationLimit + '&appid=ef60850d396977a8d1f7bb3a7e730be4')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=84b79da5e5d7c92085660485702f4ce8`)
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // send city & it's data to display current conditions function
        displayCurrentConditions(city, data);
        displayForecast(city, data);
    });
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
    currentIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png' class='current-weather-icon'>"; //<<< figure out how to put weather icon 
    
    var currentDate = document.createElement("li");
    currentConditions.appendChild(currentDate);
    currentDate.textContent = Date(data.current.dt * 1000); // <<< figure out how to input current date (moment.js?)

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

    if (data.current.uvi > 0 && data.current.uvi < 3) {
        currentUVI.className = "text-success";
    }
    if (data.current.uvi >= 3 && data.current.uvi < 8) {
        currentUVI.className = "text-warning";
    }
    else {
        currentUVI.className = "text-danger";
    }

};

var displayForecast = function(city, data) {
    var forecastHeader = document.getElementById("forecast-header");
    forecastHeader.textContent = "Displaying Forecast for: " + city;

    //// day 1 of forecast ////
    var forecastContainer = document.getElementById("forecast");
    var forecastConditions1 = document.createElement("ul");
    forecastConditions1.className = "forecast-conditions-list";
    forecastContainer.appendChild(forecastConditions1);

    var forecastIcon1 = document.createElement("li");
    forecastConditions1.appendChild(forecastIcon1);
    forecastIcon1.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png' class='current-weather-icon'>";

    var forecastDate1 = document.createElement("li");
    forecastConditions1.appendChild(forecastDate1);
    forecastDate1.textContent = new Date(data.daily[1].dt*1000); // << convert UNIX timestamp to js for date

    var forecastTemp1 = document.createElement("li");
    forecastConditions1.appendChild(forecastTemp1);
    forecastTemp1.textContent = data.daily[1].temp.day + "°F";

    var forecastHumidity1 = document.createElement("li");
    forecastConditions1.appendChild(forecastHumidity1);
    forecastHumidity1.textContent = data.daily[1].humidity + " kg/m^3";

    var forecastWind1 = document.createElement("li");
    forecastConditions1.appendChild(forecastWind1);
    forecastWind1.textContent = data.daily[1].wind_speed + " MPH";

    ////// day 2 of forecast /////
    var forecastConditions2 = document.createElement("ul");
    forecastConditions2.className = "forecast-conditions-list";
    forecastContainer.appendChild(forecastConditions2);

    var forecastIcon2 = document.createElement("li");
    forecastConditions2.appendChild(forecastIcon2);
    forecastIcon2.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png' class='current-weather-icon'>";

    var forecastDate2 = document.createElement("li");
    forecastConditions2.appendChild(forecastDate2);
    forecastDate2.textContent = new Date(data.daily[2].dt*1000);

    var forecastTemp2 = document.createElement("li");
    forecastConditions2.appendChild(forecastTemp2);
    forecastTemp2.textContent = data.daily[2].temp.day + "°F";

    var forecastHumidity2 = document.createElement("li");
    forecastConditions2.appendChild(forecastHumidity2);
    forecastHumidity2.textContent = data.daily[2].humidity + " kg/m^3";

    var forecastWind2 = document.createElement("li");
    forecastConditions2.appendChild(forecastWind2);
    forecastWind2.textContent = data.daily[2].wind_speed + " MPH";
    
    ///// day 3 of forecast /////

    var forecastConditions3 = document.createElement("ul");
    forecastConditions3.className = "forecast-conditions-list";
    forecastContainer.appendChild(forecastConditions3);

    var forecastIcon3 =  document.createElement("li");
    forecastConditions3.appendChild(forecastIcon3);
    forecastIcon3.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png' class='current-weather-icon'>";

    var forecastDate3  = document.createElement("li");
    forecastConditions3.appendChild(forecastDate3);
    forecastDate3.textContent = new Date(data.daily[3].dt*1000);

    var forecastTemp3 = document.createElement("li");
    forecastConditions3.appendChild(forecastTemp3);
    forecastTemp3.textContent = data.daily[3].temp.day; + "°F";

    var forecastHumidity3 = document.createElement("li");
    forecastConditions3.appendChild(forecastHumidity3);
    forecastHumidity3.textContent  = data.daily[3].humidity + " kg/m^3";

    var forecastWind3 = document.createElement("li");
    forecastConditions3.appendChild(forecastWind3);
    forecastWind3.textContent = data.daily[3].wind_speed + " MPH";

    ///// day 4 of forecast /////

    var forecastConditions4 = document.createElement("ul");
    forecastContainer.appendChild(forecastConditions4);
    forecastConditions4.className = "forecast-conditions-list";

    var forecastIcon4 = document.createElement("li");
    forecastConditions4.appendChild(forecastIcon4);
    forecastIcon4.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png' class='current-weather-icon'>";

    var forecastDate4 = document.createElement("li");
    forecastConditions4.appendChild(forecastDate4);
    forecastDate4.textContent = new Date(data.daily[4].dt*1000);

    var forecastTemp4 = document.createElement("li");
    forecastConditions4.appendChild(forecastTemp4);
    forecastTemp4.textContent = data.daily[4].temp.day + "°F";

    var forecastHumidity4 = document.createElement("li");
    forecastConditions4.appendChild(forecastHumidity4);
    forecastHumidity4.textContent = data.daily[4].humidity + " kg/m^3";

    var forecastWind4 = document.createElement("li");
    forecastConditions4.appendChild(forecastWind4);
    forecastWind4.textContent = data.daily[4].wind_speed + " MPH";

    ///// day 5 of forecast /////

    var forecastConditions5 = document.createElement("ul");
    forecastContainer.appendChild(forecastConditions5);
    forecastConditions5.className = "forecast-conditions-list";

    var forecastIcon5 = document.createElement("li");
    forecastConditions5.appendChild(forecastIcon5);
    forecastIcon5.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png' class='current-weather-icon'>";

    var forecastDate5 = document.createElement("li");
    forecastConditions5.appendChild(forecastDate5);
    forecastDate5.textContent = new Date(data.daily[5].dt*1000);

    var forecastTemp5= document.createElement("li");
    forecastConditions5.appendChild(forecastTemp5);
    forecastTemp5.textContent = data.daily[5].temp.day + "°F";

    var forecastHumidity5 = document.createElement("li");
    forecastConditions5.appendChild(forecastHumidity5);
    forecastHumidity5.textContent = data.daily[5].humidity + " kg/m^3";

    var forecastWind5 = document.createElement("li");
    forecastConditions5.appendChild(forecastWind5);
    forecastWind5.textContent = data.daily[5].wind_speed + " MPH";
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
        //save city to local storage 
        
        // clear old content
        cityInputEl.value = "";
    } else {
         //alert("Error: Please Enter a Valid City.");
    };
};

var searchedCities = [];

var saveCities = function () {
    localStorage.setItem("cities", searchedCities);
}

var loadCities = function() {

}

// var previousSearches = function() {
//     localStorage.getItem(cityName);
//     console.log(cityName);
//     var previousCityList = document.getElementById("previous-cities");
//     if (cityInputEl.value) {
//         var previousButtons = document.createElement("button")
//         previousCityList.appendChild(previousButtons);
//         previousButtons.textContent = cityName;
//     }
// }










var searchedCity = document.querySelector("#search-form");

searchedCity.addEventListener("click", formSubmitHandler);

