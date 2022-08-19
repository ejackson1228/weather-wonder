var cityInputEl = document.getElementById("city");

var formatApiResponse = function(city){
    var locationLimit = 1;
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + locationLimit + "&appid=ef60850d396977a8d1f7bb3a7e730be4";
    
    console.log(fetch(apiUrl));
    
    fetch(apiUrl)
    .then((response) => response.text()) 
    .then((text) => {
        console.log(text);
        var cityLat = text[Object[3]];
        var cityLon = text[Object[4]];
        console.log(cityLat, cityLon);
    });
        
        
    

}

var getWeatherConditions = function() {


    var apiUrlCoordinates = "https://api.openweathermap.org/data/2.5/onecall?lat=" + "35.227085" + "&lon=" + "-80.843124" + "&appid=ef60850d396977a8d1f7bb3a7e730be4";
    console.log(fetch(apiUrlCoordinates));
    
    fetch(apiUrlCoordinates)
    .then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                displayWeatherConditions(data, );
            });
        } else {
            alert("Error: Please Enter a Valid City.");
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to Weather API");
    });
};

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    // get value from input element
    var cityName = cityInputEl.value.toLowerCase().trim();
    console.log(cityName);
    if (cityName) {
        // pass cityName to getWeatherConditions function
        formatApiResponse(cityName);

        // clear old content
        cityInputEl.value = "";
    } else {
         //alert("Error: Please Enter a Valid City.");
    };
};

var displayWeatherConditions = function () {

};













var searchedCity = document.querySelector("#search-form");

searchedCity.addEventListener("click", formSubmitHandler);
