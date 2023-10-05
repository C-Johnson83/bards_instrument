let cityName = document.querySelector('#cityInput');
let button = document.querySelector('#searchButton');
var API = apiKey.key;
var url = "https://api.openweathermap.org/data/2.5/forecast?q="
var city = document.querySelector('#currentCity');
var temp = document.querySelector('#currentTemp');
var wind = document.querySelector('#currentWind');
var humidity = document.querySelector('#currentHumidity');

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
            var cityVal = data.city.name;
            var tempVal = data.list[0].main.temp;
            var windVal = data.list[0].wind.speed;
            var humidityVal = data.list[0].main.humidity;
            var dateVal = data.list[0].dt_txt;
            dateVal = dateVal.slice(0, 10);

            city.textContent = 'Current weather of ' + cityVal + ', ' + dateVal;
            temp.textContent = `Temperature: ${convert(tempVal) + '°F'}`;
            wind.textContent = `Wind Speed: ${(windVal * 2.23694).toFixed(2)} mph`;
            humidity.textContent = `Humidity: ${humidityVal}%`;
      

        });
});