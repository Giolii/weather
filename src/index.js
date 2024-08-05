import "./style.css";

let location = "Los Angeles";
const cityData = document.querySelector(".city-data");
const conditionData = document.querySelector(".condition-data");
const humidityData = document.querySelector(".humidity-data");
const precipData = document.querySelector(".precip-data");
const sunriseData = document.querySelector(".sunrise-data");
const sunsetData = document.querySelector(".sunset-data");
const nextData = document.querySelector(".next-data");
const cityInput = document.querySelector(".city-input");
const cityButton = document.querySelector(".city-button");
const tempData = document.querySelector(".temp-data");
const feelsData = document.querySelector(".feels-data");
const loader = document.querySelector(".loader");
loader.style.visibility = "hidden";
getWeather();
async function getWeather() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=3KTNJPLABB7SJ8NUJF5CM656C&contentType=json`
    );
    if (!response.ok) {
      throw new Error(`Error:${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    loadData(data);
  } catch (error) {
    console.log(`Error:`, error);
  }
}

function loadData(data) {
  const dataProcessed = {
    city: data.resolvedAddress,
    temp: data.currentConditions.temp,
    feels: data.currentConditions.feelslike,
    conditions: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    precipProb: data.currentConditions.precipprob,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
    nextDays: data.description,
  };
  cityData.textContent = dataProcessed.city;
  tempData.textContent = dataProcessed.temp;
  feelsData.textContent = dataProcessed.feels;
  conditionData.textContent = dataProcessed.conditions;
  humidityData.textContent = dataProcessed.humidity;
  precipData.textContent = dataProcessed.precipProb;
  sunriseData.textContent = dataProcessed.sunrise;
  sunsetData.textContent = dataProcessed.sunset;
  nextData.textContent = dataProcessed.nextDays;
}

cityButton.addEventListener("click", () => {
  loader.style.visibility = "visible";
  location = cityInput.value.trim();
  getWeather();
  searchPhotos();
  document.querySelector(".city-input").placeholder = location;
  setTimeout(() => {
    loader.style.visibility = "hidden";
  }, 1500);
});

async function searchPhotos() {
  const searchTerm = cityInput.value.trim();
  const apiKey = "VoeCH17NX1C0Uf7OXNFRZK0gWDefFwfLzlBJ7DUMTl3ZyLkdDSuMEadv";
  const url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=10`;

  const headers = {
    Authorization: apiKey,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayPhotos(data.photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
}

function displayPhotos(photos) {
  const city = document.body;
  const random = (Math.random() * 9).toFixed(0);
  city.style.backgroundImage = `url('${photos[random].src.large2x}')`;
  console.log(photos[0].src);
}
