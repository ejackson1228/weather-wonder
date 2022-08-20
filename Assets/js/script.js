var cityInputEl = document.getElementById("city");

var getWeatherConditions = function(city){
    var locationLimit = 1;
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&limit=' + locationLimit + '&appid=8a42d43f7d7dc180da5b1e51890e67dc')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`)
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        displayCurrentConditions(city, data);
    });
}



var displayCurrentConditions = function (city, data) {

    var currentHeader = document.querySelector("#current-header");
    currentHeader.textContent = "Displaying Current Weather for: " + city.toUpperCase();

    


};
// var getWeatherConditions = function() {
    
//     fetch(apiUrlCoordinates)
//     .then(function(response) {
//         //request was succesful
//         if (response.ok) {
//             response.json().then(function(data) {
//                 displayWeatherConditions(data, );
//             });
//         } else {
//             alert("Error: Please Enter a Valid City.");
//         }
//     })
//     .catch(function(error) {
//         alert("Unable to Connect to Weather API");
//     });
// };

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
