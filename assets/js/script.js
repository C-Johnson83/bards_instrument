var cityName = document.querySelector('#cityInput');
var button = document.querySelector('#searchButton');
var API = apiKey.key;
var url = "https://api.openweathermap.org/data/2.5/forecast?q="
var city = document.querySelector('#currentCity');
var currentTemp = document.querySelector('#currentTemp');
var currentwind = document.querySelector('#currentWind');
var currenthumidity = document.querySelector('#currentHumidity');
var dateVal;
var day = document.querySelectorAll('#day');
var temp = document.querySelectorAll('#temp');
var wind = document.querySelectorAll('#wind');
var humidity = document.querySelectorAll('#humid');
function convert(val) {
    return ((val - 273.15) * 9 / 5 + 32).toFixed(2);
}

button.addEventListener("click", function () {
    var queryUrl = url + cityName.value + "&appid=" + API;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentCity = data.city.name;
            var currentTemp = data.list[0].main.temp;
            var currentWind = data.list[0].wind.speed;
            var currentHumidity = data.list[0].main.humidity;
             dateVal = data.list[0].dt_txt;
            dateVal = dateVal.slice(0, 10);

            city.textContent = 'Current weather of ' + currentCity + ', ' + dateVal;
            currentTemp.textContent = `Temperature: ${convert(currentTemp) + '°F'}`;
            currentwind.textContent = `Wind Speed: ${(currentWind * 2.23694).toFixed(2)} mph`;
            currenthumidity.textContent = `Humidity: ${currentHumidity}%`;
            for (var i = 0; i < day.length; i++) {
                var tempVal = data.list[i].main.temp;
                var windVal = data.list[i].wind.speed;
                var humidityVal = data.list[i].main.humidity;
                var dateVal = data.list[i].dt_txt;
                // dateVal = dateVal.slice(0, 10);
                day[i].textContent = dateVal;
                // png[i]
                temp[i].textContent = `Temperature: ${convert(tempVal) + '°F'}`;
                wind[i].textContent = `Wind Speed: ${(windVal * 2.23694).toFixed(2)} mph`;
                humidity[i].textContent = `Humidity: ${humidityVal}%`;

            }
        });
});