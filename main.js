const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "004a4385c00f86d77ef90ac2acf8be92",
};

const weatherType = {
  now: "weather",
  future: "forecast",
};
const getWeatherNow = (city) => {
  fetch(`${param.url}${weatherType.now}?q=${city}&appid=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
};
const getWeatherFuture = (city) => {
  fetch(`${param.url}${weatherType.future}?q=${city}&appid=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherFuture);
};
getWeatherNow("kyiv");
getWeatherFuture("kyiv");
const inputValue = document.querySelector(".search-weather");

inputValue.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    getWeatherNow(inputValue.value);
    getWeatherFuture(inputValue.value);
  }
});

//текущаяя погодаы
const weather = document.querySelector(".weather");

function showWeather(data) {
  console.log(data);
  const temp = Math.round(data.main.temp - 270);
  const outputData = `
    <h2>${data.name}</h2>
    <dv>${temp} &deg;</div>
  `;

  weather.innerHTML = outputData;
}

//погода на пять дней
const WeatherFuture = document.querySelector(".weather-future");

function showWeatherFuture(data) {
  console.log(data.list);

  const temp = data.list.filter((e) => {
    let date = new Date(e.dt_txt);
    return date.getHours() == 18;
  });

  const outputTemp = temp.map((e) => {
    const deg = Math.round(e.main.temp - 270);
    const outputDeg = `<li>${deg} &deg;</li>`;
    return outputDeg;
  });

  const outputData = `
  <ul>${outputTemp.join("")}</ul>
  `;
  WeatherFuture.innerHTML = outputData;
}
