var cityName;
var button = $('#searchButton');
var citySearched = $('#cityButton');
var API = 'cebdbe1753a5af12101fc266dce79204';
var url = "https://api.openweathermap.org/data/2.5/weather?q="
var url2 = "https://api.openweathermap.org/data/2.5/forecast?q="
var city = $('#currentCity');
var forecast = $('#spread');
var currentIcon = $('#iconCurrent');
var searches = $('#searchedCities');
var currentTemp = $('#currentTemp');
var currentwind = $('#currentWind');
var currenthumidity = $('#currentHumidity');
var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
var reset = $('#reset');

// Listening event and function for the initial search event
button.on("click", function () {
    currentIcon.empty(); // emptying the current icon
    cityName = $('#cityInput');
    destination = cityName.val();
    console.log(cityName);
    console.log("destination value", destination);
    getWeather(destination);
    cityName.val('');
});

// Listening event and function for the searched city buttons
$(document).on("click", "#cityButton", function () {
    currentIcon.empty(); // emptying the current icon
    cityName = $(this).text();;
    console.log("button value", cityName);
    getWeather(cityName);
});

//Listening event for the reset button
reset.on("click", function(){
    searchedCities = [];
    searches.empty();
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
    console.log("A",searchedCities,"\nB", searches)
});

// Function with API calls to get the weather for the searched city
function getWeather(cityName) {
    var queryUrl = url + cityName + "&appid=" + API + "&units=imperial"; // for the current weather
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data); // checking the data
            var tempVal = data.main.temp; // get the temp value
            var windVal = data.wind.speed; // get the wind speed
            var humidityVal = data.main.humidity; // get the humidity value
            var iconVal = data.weather[0].icon; // get the icon value
            var icon = 'https://openweathermap.org/img/wn/' + iconVal + '@2x.png'; // get the icon image
            var png = $('<img src="' + icon + '">'); // creating the icon image
            // // setting the values for the current weather
            city.text('Current weather of ' + cityName);
            png.attr('id', 'weatherIcon');
            console.log(png);
            currentIcon.append(png);
            currentTemp.text(`Temperature: ${tempVal + '°F'}`);
            currentwind.text(`Wind Speed: ${(windVal * 2.23694).toFixed(2)} mph`);
            currenthumidity.text(`Humidity: ${humidityVal}%`);
        });
    var queryUrl2 = url2 + cityName + "&appid=" + API + "&units=imperial"; // for the weather forecast
    fetch(queryUrl2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data); // checking the data
            forecast.empty(); // emptying the forecast cards           
            var cityButton = $('<button id="cityButton">'); // creating a button for the searched city

            // Check if searched city name is in local storage
            if (searchedCities.includes(cityName)) { // if it is, then do nothing
            } else {
                // if it is not, then store the city name in local storage
                searchedCities.push(cityName);
                console.log(searchedCities);
                console.log(localStorage);
                localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
                // creating a button for the searched city and appending it to the recent searches list
                console.log(searchedCities);
                cityButton.text(cityName);
                searches.append(cityButton);
            }
            // loop through the data to get the 5 day forecast
            for (var i = 0; i < 40; i += 8) {
                var tempVal = data.list[i].main.temp; // get the temp value
                var windVal = data.list[i].wind.speed; // get the wind speed
                var humidityVal = data.list[i].main.humidity; // get the humidity value
                var dateVal = data.list[i].dt_txt; // get the date value
                var iconVal = data.list[i].weather[0].icon; // get the icon value
                var icon = 'https://openweathermap.org/img/wn/' + iconVal + '@2x.png'; // get the icon image
                dateVal = dateVal.slice(0, 10); // removes the time from the date
                var card = $('<div class="card"></div>'); // creating a card 
                var day = $('<h4>' + dateVal + '</h4>'); // creating the date 
                var png = $('<img src="' + icon + '">'); // creating the icon image 
                var temp = $('<p>Low Temperature: ' + tempVal + '°F</p>'); // creating the temp value 
                var wind = $('<p>Wind Speed: ' + (windVal * 2.23694).toFixed(2) + ' mph</p>'); // creating the wind speed value 
                var humidity = $('<p>Humidity: ' + humidityVal + '%</p>'); // creating the humidity value 

                // create the card, date, icon, and weather elements 
                // Append the values to the card
                card.append(day);
                card.append(png);
                card.append(temp);
                card.append(wind);
                card.append(humidity);
                // Append the card to the forecast
                forecast.append(card);
            }
        });
};

// Loop through the searchedCities array and create buttons for each searched city in the local storage
searchedCities.forEach(function(cityName) {
    var cityButton = $('<button id="cityButton">');
    cityButton.text(cityName);
    searches.append(cityButton);
});
