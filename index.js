const WEATHER_API_KEY = "7cdcebec8e1d0dceae79e9f4ff73086c";

const button = document.querySelector(".btn-search");
const inputCity = document.querySelector(".input-search");
const cityTitle = document.querySelector(".title");
const coordinates = document.querySelector(".coordinates");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature-number");
const minMaxTemp = document.querySelector(".temperature-number-minmax");
const pressureData = document.querySelector(".pressure-data");
const humidityData = document.querySelector(".humidity-data");
const windSpeedData = document.querySelector(".wind-speed-data");
const sunriseData = document.querySelector(".box-sunrise");
const sunsetData = document.querySelector(".box-sunset");

const convertTimeStamp = (time) => {
  const date = new Date(time * 1000);
  const hour = date.toLocaleString().split(",")[1];
  const result = hour.split("").splice(0, 5).join("");
  return result;
};

const convertDate = (time) => {
  const date = new Date(time * 1000);
  const myDate = date.toLocaleString().split(",")[0];
  return myDate;
};

const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    data = await response.json();

    const sunriseHour = convertTimeStamp(data.sys.sunrise);
    const sunsetHour = convertTimeStamp(data.sys.sunset);

    cityTitle.innerHTML = `<i class="fi fi-rs-apartment"> ${data.name},${data.sys.country}</i>`;
    coordinates.innerHTML = `<i class="fi fi-rs-marker">longitude: ${data.coord.lon} | latitude: ${data.coord.lat}</i>`;
    description.innerHTML = data.weather[0].main;
    temperature.innerHTML = `${Math.floor(data.main.temp)}°`;
    minMaxTemp.innerHTML = ` <i class="fi fi-ts-temperature-low color-aqua">°${Math.floor(
      data.main.temp_min
    )}</i> | <i
                class="fi fi-tr-temperature-high color-red"
              >
               °${Math.floor(data.main.temp_max)}</i
              >`;
    pressureData.innerHTML = `${data.main.pressure / 1000} Pa`;
    humidityData.innerHTML = ` <i class="fi fi-rr-humidity"> ${data.main.humidity}%</i>`;
    windSpeedData.innerHTML = `<i class="fi fi-rr-wind"> ${data.wind.speed} km/h</i>`;
    sunriseData.innerHTML = `  <i class="fi fi-rr-sunrise-alt"></i> ${sunriseHour}`;
    sunsetData.innerHTML = `<i class="fi fi-rr-sunset"></i> ${sunsetHour}`;
  } catch (err) {
    if (err) {
      cityTitle.innerHTML = `<div class="title color-red">Please enter a valid city!</div>`;
      coordinates.innerHTML = `<i class="fi fi-rs-marker">longitude: ---- | latitude: ----</i>`;
      description.innerHTML = `----`;
      temperature.innerHTML = `----`;
      minMaxTemp.innerHTML = ` <i class="fi fi-ts-temperature-low color-aqua"> 0 </i> | <i
                  class="fi fi-tr-temperature-high color-red"
                > 
                  0</i
                >`;
      pressureData.innerHTML = `---- Pa`;
      humidityData.innerHTML = ` <i class="fi fi-rr-humidity"> ---- %</i>`;
      windSpeedData.innerHTML = `<i class="fi fi-rr-wind"> ---- km/h</i>`;
      sunriseData.innerHTML = `  <i class="fi fi-rr-sunrise-alt"></i> ----`;
      sunsetData.innerHTML = `<i class="fi fi-rr-sunset"></i> ----`;
    }
  }
};

button.addEventListener("click", () => {
  const city = inputCity.value;
  inputCity.value="";
  fetchWeather(city);
});
