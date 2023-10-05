let cityName = document.querySelector('#cityInput');
let button = document.querySelector('#searchButton');
var API = apiKey.key;
var url = "https://api.openweathermap.org/data/2.5/forecast?q="

button.addEventListener("click", function() {
    var queryUrl = url + cityName.value + "&appid=" + API;
   fetch( queryUrl )
   .then(function(response) {
        return response.json();
    })  
    .then(function(data) {
    console.log(data);
    console.log(queryUrl);
    
});
});