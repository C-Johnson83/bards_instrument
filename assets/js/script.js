var cityName = $('#cityInput');
var button = $('#searchButton');
var API = 'cebdbe1753a5af12101fc266dce79204';
var url = "https://api.openweathermap.org/data/2.5/forecast?q="
var city = $('#currentCity');
var forecast = $('#spread');
var currentTemp = $('#currentTemp');
var currentwind = $('#currentWind');
var currenthumidity = $('#currentHumidity');
function convert(val) {
    return ((val - 273.15) * 9 / 5 + 32).toFixed(2);
}

button.on("click", function () {
    console.log(cityName.val());
    var queryUrl = url + cityName.val() + "&appid=" + API;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            forecast.empty();
            var currCity = data.city.name;
            var currTemp = data.list[0].main.temp;
            var currWind = data.list[0].wind.speed;
            var currHumidity = data.list[0].main.humidity;
            dateVal = data.list[0].dt_txt;
            dateVal = dateVal.slice(0, 10);

            city.text('Current weather of ' + currCity + ', ' + dateVal);
            currentTemp.text ( `Temperature: ${convert(currTemp) + '°F'}`);
            currentwind.text ( `Wind Speed: ${(currWind * 2.23694).toFixed(2)} mph`);
            currenthumidity.text  (`Humidity: ${currHumidity}%`);
            for (var i = 0; i < 40; i += 8) {
                var tempVal = data.list[i].main.temp;
                var windVal = data.list[i].wind.speed;
                var humidityVal = data.list[i].main.humidity;
                var dateVal = data.list[i].dt_txt;
                var iconVal = data.list[i].weather[0].icon;
                var icon = 'https://openweathermap.org/img/wn/' + iconVal + '@2x.png';
                dateVal = dateVal.slice(0, 10); // removes the time from the date


                var card = $('<div class="card"></div>');
                var day = $('<h4>' + dateVal + '</h4>');
                var png = $('<img src="' + icon + '">');
                var temp = $('<p>Temperature: ' + convert(tempVal) + '°F</p>');
                var wind = $('<p>Wind Speed: ' + (windVal * 2.23694).toFixed(2) + ' mph</p>');
                var humidity = $('<p>Humidity: ' + humidityVal + '%</p>');

                card.append(day);
                card.append(png);
                card.append(temp);
                card.append(wind);
                card.append(humidity);

                forecast.append(card);
            }
        });
});