const apiKey = "bd6a33bf1ae4ff07cbfe080ca9b11f66";
let units = "metric";
function formatDate(value) {
  if (value < 10) {
    value = `0${value}`;
    return value;
  }
}

function updateValue(inputID, inputValue) {
  let input = document.querySelector(inputID);
  input.innerHTML = inputValue;
}

function currentTime() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const curDay = days[now.getDay()];

  let curDate = now.getDate();
  if (curDate < 10) {
    curDate = `0{curDate}`;
  }
  // formatDate(curDate);

  let curMinutes = now.getMinutes();
  if (curMinutes < 10) {
    curMinutes = `0${curMinutes}`;
  }

  let curHours = now.getHours();
  let time = null;

  if (units != "metric") {
    if (curHours === 0) {
      time = `12:${curMinutes} AM`;
    } else if (curHours === 12) {
      time = `12:${curMinutes} PM`;
    } else if (curHours > 12) {
      curHours = curHours % 12;
      time = `${curHours}:${curMinutes} PM`;
    } else if (curHours < 12) {
      time = `${curHours}:${curMinutes} AM`;
    }
  } else if (curHours < 10) {
    time = `0${curHours}:${curMinutes}`;
  } else {
    time = `${curHours}:${curMinutes}`;
  }
  // formatDate(curMinutes);

  const cDate = `
  ${curDate} 
  ${months[now.getMonth()]} 
  ${now.getFullYear()} 
  ${time}`;

  let currentDay = document.querySelector("#currentDay");
  currentDay.innerHTML = curDay;

  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = cDate;
}

currentTime();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = date.getDay();
  day = days[day];
  return day;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Now",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `${month} ${day}`;
}
function showAdvice(iconNumber) {
  let weatherIconDictionary = {
    "01d":
      "Cappuccino: 1/3 espresso and 1/3 steamed milk, followed by 1/3 of creamy milk foam on top",
    "02d": "Cortado: 1/2 milk and 1/2 espresso",
    "03d": "Latte: espresso and steamed milk with a thin layer of foam on top",
    "04d":
      "Red Eye: a cup of regular drip coffee with a shot of espresso on top",
    "09d":
      "Mocha: is made from similar layers of espresso, milk, and chocolate",
    "10d":
      "Raf: a shot of espresso, a tbs each of plain sugar, vanilla sugar, and a splash of cream",
    "11d":
      "Cappuccino: 1/3 espresso, 1/3 steamed milk and 1/3 of creamy milk foam on top",

    "13d":
      "Macchiato: a tablespoon or two of foamed milk added to a shot of espresso",
    "50d":
      "Cold brew: steep coffee grounds in cold or room temperature water for at least 12 hours ",
    "01n":
      "This night is perfect for a stargazing with a cup of your favourite coffee",
    "02n": "Evening walking will help improve your sleep",
    "03n":
      "Espresso Con Panna: a shot of espresso served with a swirl of whipped cream on top",
    "04n": "Espresso Romano: a shot of espresso with sugar and lemon",
    "09n":
      "Turkish Coffee: boil in the cezve over hot sand till it just about spills",
    "10n":
      "Piccolo Latte: a shot of espresso, two-parts steamed milk and a tiny layer of foam on top",
    "11n": "Frappé: good ol' Nescafé instant coffee powder, water, and sugar",
    "13n":
      "Caffè Breve: one-part whole milk and one-part light cream steaming and a shot of espresso",
    "50n": "Good ol' Espresso",
  };
  let advise = weatherIconDictionary[iconNumber];
  return advise;
}

function showWeatherIcon(iconNumber) {
  let weatherIconDictionary = {
    "01d": "01d.svg",
    "02d": "02d.svg",
    "03d": "03d.svg",
    "04d": "04.svg",
    "09d": "09d.svg",
    "10d": "10d.svg",
    "11d": "11.svg",
    "13d": "12.svg",
    "50d": "51.png",
    "01n": "01n.svg",
    "02n": "02n.svg",
    "03n": "03n.svg",
    "04n": "04.svg",
    "09n": "09n.svg",
    "10n": "10n.svg",
    "11n": "11.svg",
    "13n": "12.svg",
    "50n": "51.png",
  };
  let weatherIcon = weatherIconDictionary[iconNumber];
  return weatherIcon;
}

function displayWeatherForecast(responce) {
  let forecast = responce.data.daily;
  forecast.shift();

  let forecastElement = document.querySelector("#weather-forecast-wrapper");
  let forecastHTML = `  <div class="row " >`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm future-weather">
          <div class="day">${formatDay(forecastDay.dt)}</div>
          
          <div class="forecast-date">${formatForecastDate(forecastDay.dt)}</div>
          <img
            class="forecast-icon"
            src="images/animated/${showWeatherIcon(
              forecastDay.weather[0].icon
            )}"
             alt="${forecastDay.weather[0].description}"
             title="${forecastDay.weather[0].description}"
     
          />
          <div class="forecast-temperature">
            <span class="min-temperature">
              ${Math.round(forecastDay.temp.min)}°
            </span>
            ${Math.round(forecastDay.temp.max)}°
        </div>
       </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function weatherForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherForecast);
}

function showWeather(responce) {
  updateValue("#cityName", responce.data.name);

  celsiusTemperature = Math.round(responce.data.main.temp);

  updateValue("#temperature", celsiusTemperature);

  updateValue("#hymidity", responce.data.main.humidity);

  updateValue("#wind", Math.round(responce.data.wind.speed));

  updateValue("#clouds", responce.data.clouds.all);

  weatherIcon = `<img
      src="images/animated/${showWeatherIcon(responce.data.weather[0].icon)}"
      id="weather-icon"
      alt="${responce.data.weather[0].description}"
      title="${responce.data.weather[0].description}"
    />`;
  updateValue("#current-weather-icon", weatherIcon);
  weatherForecast(responce.data.coord);
  updateValue("#advise", showAdvice(responce.data.weather[0].icon));
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function changeLocation(event) {
  event.preventDefault();
  let inputLocation = document.querySelector("#search-city-input");

  if (inputLocation.value.length > 0) {
    search(inputLocation.value);
  }
}

// Current Geolocation weather
function showPositionWeather(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function currentPositionWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  units = "imperial";
  let windSpeedUnits = document.querySelector("#wind-speed-units");
  windSpeedUnits.innerHTML = "mph";
  let city = document.querySelector("h1").innerHTML;
  currentTime();
  search(city);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  units = "metric";
  let windSpeedUnits = document.querySelector("#wind-speed-units");
  windSpeedUnits.innerHTML = "km/h";
  let city = document.querySelector("h1").innerHTML;
  currentTime();
  search(city);
}

let geolocationButton = document.querySelector("#current-location-button");
geolocationButton.addEventListener("click", currentPositionWeather);

let celsiusTemperature = null;

const form = document.querySelector("#location-form");
form.addEventListener("submit", changeLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
