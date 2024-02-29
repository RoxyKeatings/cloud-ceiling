function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayCityTemp(response) {
  let temperatureElement = document.querySelector("#temperature-now");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time-stamp");
  timeElement.innerHTML = formatDate(date);

  let clouddescription = response.data.condition.description;
  weatherDescriptionElement.innerHTML = clouddescription;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let windElement = document.querySelector("#wind-speed");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${wind}km/h`;

  let feelsLikeWeatherElement = document.querySelector("#feels-like-weather");
  let feelsLike = response.data.temperature.feels_like;
  feelsLikeWeatherElement.innerHTML = Math.round(feelsLike);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-icon" />`;
}

function searchCity(city) {
  const apiKey = "89b05tfca20b16d5f5e3c646e1oa37db";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemp);
}

function submittedCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submittedCitySearch);

searchCity("London");
