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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "89b05tfca20b16d5f5e3c646e1oa37db";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon">
        <img
          src="${day.condition.icon_url}"
          width="45px"
        />
      </div>
      <div class="weather-forecast-description">${
        day.condition.description
      }</div>
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          day.temperature.maximum
        )}° | </span>
        <span class="weather-forecast-temperature-min">${Math.round(
          day.temperature.minimum
        )}°</span>
      </div>
    </div>
  </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submittedCitySearch);

searchCity("Komoka");
