document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = '68b9917cc957ac8a671efc0df706d68e'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            if (data.cod === 200) {
                weatherDiv.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
                document.body.style.background = getBackgroundColor(data.weather[0].main);
            } else {
                weatherDiv.innerHTML = '<p>City not found. Please try again.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weather').innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
});

function getBackgroundColor(weather) {
    switch(weather.toLowerCase()) {
        case 'clear':
            return 'linear-gradient(to right, #00c6ff, #0072ff)';
        case 'clouds':
            return 'linear-gradient(to right, #d3d3d3, #a9a9a9)';
        case 'rain':
            return 'linear-gradient(to right, #00c6ff, #0072ff)';
        case 'snow':
            return 'linear-gradient(to right, #f1f1f1, #c2c2c2)';
        default:
            return 'linear-gradient(to right, #00c6ff, #0072ff)';
    }
}
